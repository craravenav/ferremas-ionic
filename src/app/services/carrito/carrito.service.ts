import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private sqliteConnection!: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;

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
        await this.crearTablaCarrito();
      } else {
        console.error('No se pudo abrir la conexión a la base de datos');
      }
    } catch (error) {
      console.error('Error inicializando la base:', error);
    }
  }
  
  private async crearTablaCarrito() {
    if (this.db) {
      // Asegurarnos de que la tabla existe antes de realizar consultas
      await this.db.execute( `
        CREATE TABLE IF NOT EXISTS carrito (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          productoId INTEGER NOT NULL,
          nombre TEXT NOT NULL,
          precio REAL NOT NULL,
          cantidad INTEGER NOT NULL
        );
      `);
      console.log('Tabla usuarios creada o ya existe.');
    } else {
      console.error('La base de datos no está abierta correctamente.');
    }
  }

  async agregarProducto(producto: { id: number; nombre: string; precio: number; cantidad: number }) {
    if (!this.db) return;

    try {
      const query = `
        INSERT INTO carrito (productoId, nombre, precio, cantidad)
        VALUES (?, ?, ?, ?);
      `;
      await this.db.run(query, [producto.id, producto.nombre, producto.precio, producto.cantidad]);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  }

  async obtenerProductos(): Promise<any[]> {
    if (!this.db) return [];

    try {
      const query = 'SELECT * FROM carrito;';
      const result = await this.db.query(query);
      return result.values || [];
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error);
      return [];
    }
  }

  async limpiarCarrito() {
    if (!this.db) return;

    try {
      const query = 'DELETE FROM carrito;';
      await this.db.execute(query);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  }
}