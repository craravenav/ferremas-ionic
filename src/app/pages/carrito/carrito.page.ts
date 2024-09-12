import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {

  email!: string;
  password!: string;
  usuario!: string;

  constructor(private router: Router, private menuCCtrl: MenuController) {
    // Obtiene los datos del estado de navegación si existen
    if (this.router.getCurrentNavigation()?.extras.state) {
      const datosUsuario = this.router.getCurrentNavigation()?.extras.state;
      this.email = datosUsuario?.['email'];
      this.password = datosUsuario?.['password'];
      this.usuario = datosUsuario?.['usuario'];
    }
  }

  goToCarrito() {
    const navigationExtras: NavigationExtras = { 
      state: {
        email: this.email,
        password: this.password,
        usuario: this.usuario
      }
    };
    this.router.navigate(['/carrito'],navigationExtras);
  }

  openSideCategoria() {
    this.menuCCtrl.open('side-categoria');
  }

  goToLogin() {
    this.menuCCtrl.close();
    this.router.navigate(['/login']);
  }

  openSideUsuario() {
    this.menuCCtrl.open('side-usuario');
  }

  goToTienda() {
    const navigationExtras: NavigationExtras = { 
      state: {
        email: this.email,
        password: this.password,
        usuario: this.usuario
      }
    };
    this.menuCCtrl.close();
    this.router.navigate(['/tienda'], navigationExtras);
  }
}
