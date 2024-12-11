import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { IonModal, AnimationController, MenuController, ToastController } from '@ionic/angular';
import { Animation } from '@ionic/core';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación
import { ClaseProducto } from '../../services/model/ClaseProducto';
import { ProductoServicioService } from '../../services/producto/producto-servicio.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements AfterViewInit {

  @ViewChild('modal', { static: false }) modal!: IonModal;

  email!: string;
  password!: string;
  usuario!: string;
  productos: ClaseProducto[] = [];
  productoSeleccionado: any;
  productosFiltrados: ClaseProducto[] = [];
  searchTerm: string = ''; 

  constructor(
    private router: Router,
    private animationCtrl: AnimationController,
    private menuCtrl: MenuController,
    private toastController: ToastController,
    private authService: AuthService, // Inyecta el servicio de autenticación
    public restApi: ProductoServicioService,
    public loadingController: LoadingController,
    private alertController: AlertController
  ) {
    // Obtiene los datos del estado de navegación si existen
    if (this.router.getCurrentNavigation()?.extras.state) {
      const datosUsuario = this.router.getCurrentNavigation()?.extras.state;
      this.email = datosUsuario?.['email'];
      this.password = datosUsuario?.['password'];
      this.usuario = datosUsuario?.['usuario'];
    }
  }

  ngAfterViewInit() {
    this.getProducts();
    this.cargarDatosUsuario(); // Llama a la función para cargar los datos del usuario
    if (this.modal) {
      const enterAnimation = (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot || baseEl;

        const backdropElement = root.querySelector('ion-backdrop');
        const wrapperElement = root.querySelector('.modal-wrapper');

        const backdropAnimation = backdropElement
          ? this.animationCtrl
              .create()
              .addElement(backdropElement)
              .fromTo('opacity', '0.01', 'var(--backdrop-opacity)')
          : null;

        const wrapperAnimation = wrapperElement
          ? this.animationCtrl
              .create()
              .addElement(wrapperElement)
              .keyframes([
                { offset: 0, opacity: '0', transform: 'scale(0)' },
                { offset: 1, opacity: '0.99', transform: 'scale(1)' },
              ])
          : null;

        const animations = [backdropAnimation, wrapperAnimation].filter(
          Boolean
        ) as Animation[];

        return this.animationCtrl
          .create()
          .addElement(baseEl)
          .easing('ease-out')
          .duration(500)
          .addAnimation(animations);
      };

      const leaveAnimation = (baseEl: HTMLElement) => {
        return enterAnimation(baseEl).direction('reverse');
      };

      this.modal.enterAnimation = enterAnimation;
      this.modal.leaveAnimation = leaveAnimation;
    } else {
      console.error('Modal is undefined');
    }
  }

  openModal(producto: any) {
    this.productoSeleccionado = producto; // Almacena los datos del producto
    if (this.modal) {
      this.modal.present(); // Abre el modal
    } else {
      console.error('Modal is undefined');
    }
  }

  cargarDatosUsuario() {
    // Obtiene el usuario autenticado desde el servicio de autenticación
    const usuarioActual = this.authService.getUsuarioActual();
    if (usuarioActual) {
      this.usuario = `${usuarioActual.nombre} ${usuarioActual.apellido}`; // Asigna el nombre y apellido a la variable `usuario`
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  goToLogin() {
    this.authService.cerrarSesion(); // Cierra la sesión al navegar al login
    this.menuCtrl.close();
    this.router.navigate(['/login']);
  }

  goToCarrito() {
    const navigationExtras: NavigationExtras = { 
      state: {
        email: this.email,
        password: this.password,
        usuario: this.usuario
      }
    };
    this.menuCtrl.close();
    this.router.navigate(['/carrito'], navigationExtras);
  }

  // Método  que rescta los productos
  async getProducts() {
    // Crea un Wait (Esperar)
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    // Muestra el Wait
    await loading.present();
    // Obtiene el Observable del servicio
    await this.restApi.getProducts()
      .subscribe({
        next: (res) => { 
  // Si funciona asigno el resultado al arreglo productos
          this.productos = res;
          this.productosFiltrados = [...this.productos];
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
    })

  }

  filtrarProductos() {
    const termino = this.searchTerm.toLowerCase().trim();
  
    if (!termino) {
      // Si no hay término de búsqueda, muestra todos los productos
      this.productosFiltrados = [...this.productos];
      return;
    }
  
    // Filtra los productos según el término de búsqueda
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(termino)
    );
  }


  openSideCategoria() {
    this.menuCtrl.open('side-categoria');
  }

  openSideUsuario() {
    this.menuCtrl.open('side-usuario');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Producto agregado correctamente',
      duration: 1500,
      position: position,
    });

    await toast.present();
    this.closeModal();
  }
}
 
