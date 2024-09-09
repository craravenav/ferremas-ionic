import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, customPasswordValidator()]]
    });
  }

  // Función para manejar el registro
  async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      // Limpia el formulario después del registro
      this.registerForm.reset();
      this.router.navigate(['/login'], { queryParams: { registrationSuccess: 'true' }});
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
