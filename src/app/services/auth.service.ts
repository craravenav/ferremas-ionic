import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

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

  private usuarioActual: Usuario | null = null;

  constructor() {
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
            password TEXT NOT NULL
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

  // Registra un nuevo usuario en la base de datos
  async registrarUsuario(nombre: string, apellido: string, email: string, password: string): Promise<boolean> {
    try {
      if (this.db) {
        const query = `INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?);`;
        await this.db.run(query, [nombre, apellido, email, password]);
        console.log('Usuario registrado correctamente:', { nombre, apellido, email });
        return true;
      } else {
        console.error('No hay conexión de base de datos para registrar el usuario');
        return false;
      }
    } catch (error) {
      console.error('Error registrando usuario:', error);
      return false;
    }
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
}
