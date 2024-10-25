import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseProducto } from '../../model/ClaseProducto';

import { ProductoServicioService } from '../producto-servicio.service';



@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss'],
})
export class ProductoAddPage implements OnInit {


  productForm!: FormGroup;
  producto: ClaseProducto; 
  marcas: any[] = []; // Array para almacenar las marcas
  categorias: any[] = []; // Array para almacenar las categorías

  // Injectamos FormBuilder, el cual nos permitirá realizar validaciones                         
  constructor(private formBuilder: FormBuilder,
    // Injectamos las librerías necesarias
    private loadingController: LoadingController,
    private restApi: ProductoServicioService,
    private router: Router,
  ) {
     this.producto = new ClaseProducto();
   }

  ngOnInit() {
    // Especificamos que todos los campos son obligatorios
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
    this.getMaxId();
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

  getMaxId() {
    this.restApi.getProducts().subscribe(
      (productos) => {
        // Obtener todos los IDs de los productos
        const ids = productos.map((producto: any) => producto.id);
        
        // Encontrar el ID máximo
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;

        // Asignar el nuevo ID al producto
        this.producto.id = (maxId + 1).toString(); // Incrementar en 1
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  goToProductoList() {
    this.router.navigate(['/producto-list']);
  }

  async onFormSubmit(form: NgForm) {


    // Creamos un Loading Controller, Ojo no lo muestra
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    // Muestra el Loading Controller
    await loading.present();

    if(this.productForm.valid){
      this.producto.nombre = this.productForm.get('producto_nombre')?.value;
      this.producto.descripcion = this.productForm.get('producto_descripcion')?.value;
      this.producto.precio = this.productForm.get('producto_precio')?.value;
      this.producto.imagen = this.productForm.get('producto_imagen')?.value;
      this.producto.categoria_id = this.productForm.get('producto_categoria')?.value;
      this.producto.marca_id = this.productForm.get('producto_marca')?.value;
      this.producto.stock = this.productForm.get('producto_stock')?.value;

      // Ejecuta el método del servicio y los suscribe
      this.restApi.addProduct(this.producto).subscribe({
        next: (res) => {
            loading.dismiss(); // Elimina el loading
            this.router.navigate(['/producto-list']);
        }
        , error: (err) => {
          loading.dismiss(); //Elimina la espera
        }
      });
    } else {
      loading.dismiss(); // Elimina el loading si el formulario es inválido
      console.error('Formulario no válido');
    }

  }

}

