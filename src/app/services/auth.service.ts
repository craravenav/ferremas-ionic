import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { HttpClient } from '@angular/common/http';


interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  sincronizado: number;
  id_sqlite: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sqliteConnection!: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private jsonServerUrl = 'https://ferremasdb.onrender.com/usuarios';
  private usuarioActual: Usuario | null = null;

  constructor(private http: HttpClient) {
    // Verifica si la plataforma es nativa antes de inicializar
    if (Capacitor.isNativePlatform()) {
      this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
      this.inicializarBaseDeDatos();
    } else {
      console.error('SQLite plugin is not available on the web.');
    }
  }

  // Método para inicializar la base de datos
  private async inicializarBaseDeDatos() {
    try {
      this.db = await this.sqliteConnection.createConnection('ferremas-db', false, 'no-encryption', 1, false);
      if (this.db) {
        await this.db.open();
        await this.crearTablaUsuarios();
      } else {
        console.error('No se pudo abrir la conexión a la base de datos');
      }
    } catch (error) {
      console.error('Error inicializando la base:', error);
    }
  }

  private async crearTablaUsuarios() {
    if (this.db) {
      // Asegurarnos de que la tabla existe antes de realizar consultas
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          sincronizado INTEGER DEFAULT 0
        );
      `);
      console.log('Tabla usuarios creada o ya existe.');
    } else {
      console.error('La base de datos no está abierta correctamente.');
    }
  }

  // Método para cerrar la conexión de la base de datos
  async cerrarBaseDeDatos() {
    try {
      if (this.db) {
        await this.db.close();
        console.log('Base de datos cerrada correctamente');
      } else {
        console.error('No hay conexión de base de datos para cerrar');
      }
    } catch (error) {
      console.error('Error cerrando la base de datos:', error);
    }
  }

  // Validar usuario, primero en JSON server si hay conexión, luego en SQLite si no hay
  async validarUsuario(email: string, password: string): Promise<boolean> {
    const estadoRed = await Network.getStatus();
    if (estadoRed.connected) {
      // Validación con conexión a JSON server
      return this.validarEnJsonServer(email, password);
    } else {
      // Validación sin conexión en SQLite
      return this.validarEnSQLite(email, password);
    }
  }

  // Validar el usuario en el JSON server
  private validarEnJsonServer(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<Usuario[]>(`${this.jsonServerUrl}?email=${email}&password=${password}`)
        .subscribe(
          (response) => {
            if (response.length > 0) {
              this.usuarioActual = response[0];  // Usuario encontrado
              console.log('Usuario validado correctamente en el JSON server:', this.usuarioActual);
              resolve(true);
            } else {
              console.log('Usuario no encontrado en el JSON server.');
              resolve(false);
            }
          },
          (error) => {
            console.error('Error validando usuario en el JSON server:', error);
            resolve(false);
          }
        );
    });
  }

  // Validar el usuario en SQLite cuando no hay conexión
  private async validarEnSQLite(email: string, password: string): Promise<boolean> {
    if (this.db) {
      const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?;`;
      const result = await this.db.query(query, [email, password]);

      if (result.values && result.values.length > 0) {
        this.usuarioActual = result.values[0] as Usuario;
        console.log('Usuario validado correctamente en SQLite:', this.usuarioActual);
        return true;
      } else {
        console.log('No se encontró un usuario con las credenciales proporcionadas en SQLite.');
        return false;
      }
    }
    return false;
  }

  // Método para sincronizar usuarios de SQLite al JSON server y luego eliminar de SQLite
  async sincronizarUsuarios(): Promise<void> {
    const estadoRed = await Network.getStatus();
    if (estadoRed.connected) {
      const usuariosNoSincronizados = await this.obtenerUsuariosNoSincronizados();
      for (const usuario of usuariosNoSincronizados) {
        const usuarioExisteEnJson = await this.verificarExistenciaEnJsonServer(usuario);
        console.log(`El id_sqlite despues de verificar existencia: ${usuario.id_sqlite} `)
        if (!usuarioExisteEnJson) {
          const guardado = await this.guardarEnJsonServer(usuario);
          if (guardado) {
            console.log(`El id_sqlite a eliminar es: ${usuario.id_sqlite} `)
            await this.eliminarUsuarioSQLite(usuario.id_sqlite);
          }
        } else {
          console.log(`El usuario con email ${usuario.email} ya existe en JSON Server.`);
        }
      }
    }
  }

  // Método para verificar si un usuario ya existe en JSON Server
private async verificarExistenciaEnJsonServer(usuario: Usuario): Promise<boolean> {
  return new Promise((resolve, reject) => {
    this.http.get<Usuario[]>(this.jsonServerUrl).subscribe(
      (usuarios: Usuario[]) => {
        // Verificar si el email o el id_sqlite ya existen
        const existe = usuarios.some(u => u.email === usuario.email || u.id_sqlite === usuario.id_sqlite);
        resolve(existe); 
      },
      (error) => {
        console.error('Error al verificar existencia de usuario en JSON Server:', error);
        resolve(false);  
      }
    );
  });
}

  // Método para guardar el usuario en el JSON server
  public guardarEnJsonServer(usuario: Usuario): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Primero verificamos si el usuario existe en SQLite
      this.buscarUsuarioEnSQLite(usuario.email).then((usuarioSQLite) => {
        if (usuarioSQLite) {
          // Si el usuario existe en SQLite y no está sincronizado, asignamos el id_sqlite
          if (usuarioSQLite.sincronizado === 0) {
            usuario.id_sqlite = parseInt(usuarioSQLite.id); 
          } else {
            // Si el usuario ya está sincronizado, no hacemos nada más en SQLite
            usuario.id_sqlite = usuarioSQLite.id_sqlite;
          }
        }
  
        // Ahora obtenemos el máximo ID en el JSON Server
        this.http.get<Usuario[]>(this.jsonServerUrl).subscribe(
          (usuarios: Usuario[]) => {
            // Obtenemos el máximo ID (suponiendo que es texto, por lo que hacemos comparaciones alfabéticas)
            let maxId = this.obtenerMaxId(usuarios);
  
            // Generamos un nuevo ID y actualizamos la marca de sincronizado
            usuario.id = this.generarNuevoId(maxId);
            usuario.sincronizado = 1;
  
            // Ahora guardamos el usuario con el nuevo ID en JSON Server
            this.http.post<Usuario>(this.jsonServerUrl, usuario).subscribe(
              (response) => {
                console.log('Usuario registrado correctamente en el JSON server:', response);
                resolve(true);
              },
              (error) => {
                console.error('Error guardando usuario en el JSON server:', error);
                resolve(false);
              }
            );
          },
          (error) => {
            console.error('Error obteniendo usuarios del JSON server:', error);
            resolve(false);
          }
        );
      });
    });
  }

  private async buscarUsuarioEnSQLite(email: string): Promise<Usuario | null> {
    try {
      if (this.db) {
        const query = `SELECT * FROM usuarios WHERE email = ?;`;
        const result = await this.db.query(query, [email]);
  
        // Si encontramos un usuario, lo devolvemos
        if (result.values && result.values.length > 0) {
          return result.values[0] as Usuario; 
        }
  
        return null;
      } else {
        console.error('No hay conexión de base de datos');
        return null;
      }
    } catch (error) {
      console.error('Error buscando usuario en SQLite:', error);
      return null;
    }
  }


  // Eliminar el usuario de SQLite después de sincronizar con JSON server
  private async eliminarUsuarioSQLite(id_sqlite: number): Promise<void> {
    if (this.db) {
      const query = `DELETE FROM usuarios WHERE id = ?;`;
      await this.db.run(query, [id_sqlite]);
      console.log(`Usuario con ID ${id_sqlite} eliminado de SQLite tras sincronización.`);
    }
  }

  async registrarUsuario(nombre: string, apellido: string, email: string, password: string): Promise<boolean> {
    try {
      const usuario: Usuario = { id: "0", nombre, apellido, email, password, id_sqlite: 0, sincronizado: 0 };
  
      // Guardo en SQLite
      const usuarioGuardadoSQLite = await this.guardarEnSQLite(usuario);
      if (!usuarioGuardadoSQLite) {
        console.error('Error al guardar el usuario en SQLite');
        return false; 
      }
      
      await this.sincronizarUsuarios();

      return true;
    } catch (error) {
      console.error('Error registrando usuario:', error);
      return false;
    }
  }

  // Método para guardar el usuario en SQLite
  private async guardarEnSQLite(usuario: Usuario): Promise<boolean> {
    try {
      if (this.db) {
        const query = `INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?);`;
        await this.db.run(query, [usuario.nombre, usuario.apellido, usuario.email, usuario.password]);

        return true;

      } else {
        console.error('No hay conexión de base de datos para registrar el usuario');
        return false;
      }
    } catch (error) {
      console.error('Error registrando usuario en SQLite:', error);
      return false;
    }
  }

  

  // Método para obtener el máximo ID
  private obtenerMaxId(usuarios: Usuario[]): string {
    if (usuarios.length === 0) return '0'; 
    
    // Ordenamos los IDs alfabéticamente y obtenemos el último
    const maxId = usuarios
      .map(usuario => usuario.id)
      .sort()
      .reverse()[0]; 

    return maxId;
  }

  // Método para generar un nuevo ID
  private generarNuevoId(maxId: string): string {
    const nuevoIdNumerico = parseInt(maxId) + 1; 
    return nuevoIdNumerico.toString(); 
  }

 

  // Obtiene el usuario actual autenticado
  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  // Cierra la sesión del usuario actual
  cerrarSesion() {
    this.usuarioActual = null;
  }

  private async obtenerUsuariosNoSincronizados(): Promise<Usuario[]> {
    if (this.db) {
      const query = `SELECT * FROM usuarios WHERE sincronizado = 0;`;
      try {
        const result = await this.db.query(query);
        return result.values as Usuario[] || [];
      } catch (error) {
        console.error('Error obteniendo usuarios no sincronizados:', error);
        return [];
      }
    } else {
      console.error('No se ha abierto la base de datos correctamente.');
      return [];
    }
  }
}

