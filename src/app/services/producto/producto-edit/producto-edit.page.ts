import { Component, OnInit } from '@angular/core';

// Importamos Librerías
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClaseProducto } from '../../model/ClaseProducto';
import { ProductoServicioService } from '../producto-servicio.service';


@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  // FormGroup para validaciones
  productForm!: FormGroup;
  producto = new ClaseProducto();
  id: any = '';
  marcas: any[] = [];  // Almacena las marcas
  categorias: any[] = []; // Almacena las categorías

  constructor(public restApi: ProductoServicioService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    // Especificamos Validaciones por medio de FormGroup
    this.productForm = this.formBuilder.group({
      "producto_nombre": [null, Validators.required],
      'producto_descripcion': [null, Validators.required],
      'producto_precio': [null, Validators.required],
      'producto_imagen': [null, Validators.required],
      'producto_categoria': [null, Validators.required],
      'producto_marca': [null, Validators.required],
      'producto_stock': [null, Validators.required],
    });
    this.loadMarcas();
    this.loadCategorias();

  }

  loadMarcas() {
    this.restApi.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error al cargar marcas', error);
      }
    );
  }

  loadCategorias() {
    this.restApi.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  async onFormSubmit(form: NgForm) {

    this.producto.id = this.id;
    await this.restApi.updateProduct(this.id, this.producto)
      .subscribe({
        next: (res) => {
          let id = res['id'];
          this.router.navigate(['/producto-list/']);
        }
        , complete: () => { }
        , error: (err) => { console.log(err); }
      })

  }

  goToProductoList() {
    this.router.navigate(['/producto-list']);
  }

  async getProduct(id: number) {
    // Crea Wait
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    // Muestra Wait
    await loading.present();
    // Obtiene el Observable
    await this.restApi.getProduct(id + "")
      .subscribe({
        next: (data) => {
          // Si funciona Rescata el los datos
          this.id = data.id;
          // Actualiza los datos
          this.productForm.setValue({
            producto_nombre: data.nombre,
            producto_descripcion: data.descripcion,
            producto_precio: data.precio,
            producto_stock: data.stock,
            producto_imagen: data.imagen,
            producto_categoria: data.categoria_id,
            producto_marca: data.marca_id
          });
          loading.dismiss();
        }
        , complete: () => { }
        , error: (err) => {
          loading.dismiss();
        }
      })
  }

  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            //Si funciona el actualizar navega a listar
            this.router.navigate(['/producto-list/']);
          }
        }
      ]
    });
    await alert.present();
  }
}
