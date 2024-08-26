import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController // Corrige la inyección del alertController
  ) {
    this.registerForm = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  // Función para manejar el registro
  async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.router.navigate(['/login'], { queryParams: { registrationSuccess: 'true' }, queryParamsHandling: 'merge' });
    } else {
      // Si el formulario no es válido, muestra una alerta
      await this.showErrorAlert();
    }
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error en el Registro',
      message: 'Todos los campos son obligatorios.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
