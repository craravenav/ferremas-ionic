import { Injectable } from '@angular/core';
import { ClaseProducto } from '../model/ClaseProducto';

// Importamos  las librerías necesarias
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// creamos Constantes que utilizaremos en el envio
const apiUrl = "https://a27344595599472769ba1388312a0bfd.serveo.net/productos";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {
// Injectamos HttpClient, para poder consultar una página
constructor(private http: HttpClient) { }

// Controla y enviará un mensaje a consola para todos los errores
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error("Error de DB", error); // log to console instead
    return of(result as T);
  };
}

// Método Agregar producto, y devuelve un observable del tipo Producto
// Debe ser un Observable si deses suscribir este método en otro lado
addProduct(producto: ClaseProducto): Observable<ClaseProducto> {

  // El Pipe lo intercepta
  return this.http.post<ClaseProducto>(apiUrl, producto, httpOptions)
    .pipe(  // Tubería
      // tap intersecta la respuesta si no hay error
      tap((producto: ClaseProducto) => console.log('Producto Agregado:', producto)),
      // En caso de que ocurra Error
      catchError(this.handleError<ClaseProducto>('addProduct'))
    );
}

// Obtenemos todos los Productos
getProducts(): Observable<ClaseProducto[]> {
  return this.http.get<ClaseProducto[]>(apiUrl)
    .pipe(
      tap(heroes => console.log('Productos Obtenidos')),
      catchError(this.handleError('getProducts', []))
    );
}


//  Obtener un Producto
getProduct(id: String): Observable<ClaseProducto> {
  return this.http.get<ClaseProducto>(apiUrl + "/" + id)
    .pipe(
      tap(_ => console.log('Producto Obtenido id=${id}')),
      catchError(this.handleError<ClaseProducto>('getProduct id=${id}'))
    );
}

deleteProduct(id: string): Observable<ClaseProducto> {
  return this.http.delete<ClaseProducto>(apiUrl + "/" + id, httpOptions)
    .pipe(
      tap(_ => console.log('Producto Eliminado id=${id}')),
      catchError(this.handleError<ClaseProducto>('deleteProduct'))
    );
}

updateProduct(id: number, producto: ClaseProducto): Observable<ClaseProducto> {
  return this.http.put<ClaseProducto>(apiUrl + "/" + id, producto, httpOptions)
    .pipe(
      tap(_ => console.log('updated product id=${id}')),
      catchError(this.handleError<any>('updateProduct'))
    );
}

getMarcas() {
  return this.http.get<any[]>('https://a27344595599472769ba1388312a0bfd.serveo.net/marca'); // La URL de tu JSON Server para marcas
}

getCategorias() {
  return this.http.get<any[]>('https://a27344595599472769ba1388312a0bfd.serveo.net/categoria'); // La URL de tu JSON Server para categorías
}

}
