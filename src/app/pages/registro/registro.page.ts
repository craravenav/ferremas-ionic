import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { customPasswordValidator } from '../../custom-validators';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación

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
    private alertController: AlertController,
    private authService: AuthService // Inyecta el servicio de autenticación
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

  // Método para verificar si hay un error en el campo "Nombre"
  hasNombreError() {
    const control = this.registerForm.get('Nombre');
    return control && control.hasError('invalidCharacters') && control.touched;
  }

  // Método para verificar si hay un error en el campo "Apellido"
  hasApellidoError() {
    const control = this.registerForm.get('Apellido');
    return control && control.hasError('invalidCharacters') && control.touched;
  }

  // Función para manejar el registro
  async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const registrado = await this.authService.registrarUsuario(
        formData.Nombre,
        formData.Apellido,
        formData.Email,
        formData.Password
      );

      if (registrado) {
        await this.showSuccessAlert();
        this.router.navigate(['/login']);
      } else {
        await this.showErrorAlert('Error al registrar el usuario.');
      }
    } else {
      // Si el formulario no es válido, muestra una alerta
      await this.showErrorAlert('Todos los campos son obligatorios y la contraseña debe tener (4 números + 3 caracteres + 1 mayúscula)');
    }
  }

  // Mostrar alerta de éxito
  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'El usuario ha sido registrado con éxito.',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Mostrar alerta de error
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error en el Registro',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para ir a la página de Login
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
