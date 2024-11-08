import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sqliteConnection!: SQLiteConnection; // Utiliza el operador `!` para indicar que será inicializada
  private db: SQLiteDBConnection | null = null;
  private jsonServerUrl = 'https://a27344595599472769ba1388312a0bfd.serveo.net/usuarios';
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
      console.log('Iniciando la base de datos...');
      this.db = await this.sqliteConnection.createConnection('ferremas-db', false, 'no-encryption', 1, false);
      if (this.db) {
        await this.db.open();
        console.log('Base de datos abierta correctamente');
        await this.crearTablaUsuarios();
      } else {
        console.error('No se pudo abrir la conexión a la base de datos');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  // Método para crear la tabla de usuarios si no existe
  private async crearTablaUsuarios() {
    try {
      if (this.db) {
        await this.db.execute(`
          CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          sincronizado INTEGER DEFAULT 0 -- 0: pendiente, 1: sincronizado
        );
        `);
        console.log('Tabla de usuarios creada (si no existía)');
      } else {
        console.error('No hay conexión abierta para crear la tabla de usuarios');
      }
    } catch (error) {
      console.error('Error creating users table:', error);
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

  // Método para registrar un nuevo usuario
  async registrarUsuario(nombre: string, apellido: string, email: string, password: string): Promise<boolean> {
    try {
      const usuario: Usuario = { id: 0, nombre, apellido, email, password };

      // Verificar si hay conexión a Internet
      const estadoRed = await Network.getStatus();
      if (estadoRed.connected) {
        // Si hay conexión, guardar en el JSON server
        return this.guardarEnJsonServer(usuario);
      } else {
        // Si no hay conexión, guardar en SQLite
        return this.guardarEnSQLite(usuario);
      }
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
        console.log('Usuario registrado correctamente en SQLite:', usuario);
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

  // Método para guardar el usuario en el JSON server
  public guardarEnJsonServer(usuario: Usuario): Promise<boolean> {
    return new Promise((resolve, reject) => {
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
    });
  }

  // Valida si el usuario existe y coincide la contraseña
  async validarUsuario(email: string, password: string): Promise<boolean> {
    try {
      if (this.db) {
        const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?;`;
        const result = await this.db.query(query, [email, password]);

        if (result.values && result.values.length > 0) {
          this.usuarioActual = result.values[0] as Usuario;
          console.log('Usuario validado correctamente:', this.usuarioActual);
          return true;
        } else {
          console.log('No se encontró un usuario con las credenciales proporcionadas.');
          return false;
        }
      } else {
        console.error('No hay conexión de base de datos para validar el usuario');
        return false;
      }
    } catch (error) {
      console.error('Error validando usuario:', error);
      return false;
    }
  }

  // Obtiene el usuario actual autenticado
  getUsuarioActual(): Usuario | null {
    return this.usuarioActual;
  }

  // Cierra la sesión del usuario actual
  cerrarSesion() {
    this.usuarioActual = null;
  }

  async obtenerUsuariosNoSincronizados(): Promise<Usuario[]> {
    try {
      if (this.db) {
        const query = `SELECT * FROM usuarios WHERE sincronizado = 0;`;
        const result = await this.db.query(query);
  
        if (result.values) {
          return result.values as Usuario[];
        } else {
          return [];
        }
      } else {
        console.error('No hay conexión de base de datos para obtener usuarios');
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo usuarios no sincronizados:', error);
      return [];
    }
  }
  
  // Método para marcar un usuario como sincronizado
  async marcarComoSincronizado(id: number): Promise<void> {
    try {
      if (this.db) {
        const query = `UPDATE usuarios SET sincronizado = 1 WHERE id = ?;`;
        await this.db.run(query, [id]);
        console.log(`Usuario ${id} marcado como sincronizado`);
      } else {
        console.error('No hay conexión de base de datos para marcar como sincronizado');
      }
    } catch (error) {
      console.error('Error marcando usuario como sincronizado:', error);
    }
  }
}
