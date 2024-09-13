import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { customPasswordValidator } from '../../custom-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      Nombre: ['', [Validators.required, this.validarCaracter]],
      Apellido: ['', [Validators.required, this.validarCaracter]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, customPasswordValidator()]]
    });
  }

  // Validador para caracteres especiales y números en Nombre y Apellido
  validarCaracter(control: any) {
    const regex = /^[a-zA-Z\s]*$/; // Solo letras y espacios
    if (control.value && !regex.test(control.value)) {
      return { invalidCharacters: true };
    }
    return null;
  }

  // Métodos para obtener los errores en Nombre y Apellido
  hasNombreError() {
    const control = this.registerForm.get('Nombre');
    return control && control.hasError('invalidCharacters') && control.touched;
  }

  hasApellidoError() {
    const control = this.registerForm.get('Apellido');
    return control && control.hasError('invalidCharacters') && control.touched;
  }

  // Función para manejar el registro
  async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const registroEstado = true;
      const navigationExtras: NavigationExtras = {
        state: {
          estadoRegistro: registroEstado,
        }
      };
      // Limpia el formulario después del registro
      this.registerForm.reset();
      this.router.navigate(['/login'], navigationExtras);
    } else {
      // Si el formulario no es válido, muestra una alerta
      await this.showErrorAlert();
    }
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error en el Registro',
      message: 'Todos los campos son obligatorios y la contraseña debe Tener (4 números + 3 caracteres + 1 mayuscula)',
      buttons: ['OK']
    });

    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
