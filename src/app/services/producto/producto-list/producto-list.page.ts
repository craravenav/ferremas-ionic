import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseProducto } from '../../model/ClaseProducto';
import { ProductoServicioService } from '../producto-servicio.service';


@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.page.html',
  styleUrls: ['./producto-list.page.scss'],
})
export class ProductoListPage implements OnInit {

  productos: ClaseProducto[] = [];

  constructor(public restApi: ProductoServicioService
    , public loadingController: LoadingController
    , private alertController: AlertController
    , public router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  goToLogin() {
    this.router.navigate(['/login']);
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
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      })
  }

  async deleteProduct(id: string) {
    // Primero, crea y presenta el Alert Controller
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario cancela, no es necesario hacer nada
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Muestra el Loading Controller solo al confirmar la eliminación
            const loading = await this.loadingController.create({
              message: 'Eliminando...',
            });
            await loading.present(); // Presenta el loading

            this.restApi.deleteProduct(id).subscribe({
              next: async () => {
                await loading.dismiss(); // Dismount the loading
                await this.getProducts(); // Recargar productos después de eliminar
              },
              error: async (error) => {
                console.error('Error al eliminar el producto', error);
                await loading.dismiss(); // Dismount the loading
              }
            });
          }
        }
      ]
    });

    await alert.present(); // Presenta el alert
}

}
