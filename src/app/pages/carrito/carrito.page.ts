import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {

  constructor(private router: Router) { }

  goToHome() {
    const navigationExtras: NavigationExtras = {
      state: {
        // Aquí puedes incluir cualquier dato que quieras pasar a la página de inicio
        message: 'Bienvenido de vuelta al inicio',
        cartItems: this.getCartItems() // Ejemplo de datos del carrito
      }
    };

    this.router.navigate(['/tienda'], navigationExtras);
  }

  getCartItems() {
    // Lógica para obtener los artículos del carrito
    return [
      { id: 1, name: 'Producto 1', price: 10 },
      { id: 2, name: 'Producto 2', price: 20 }
    ];
  }
}
