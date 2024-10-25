import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  recuperarForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
    this.recuperarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.get('email')?.value;
      if (email) {
        // Aca se debe implementar logica de como recuperar la contraseña
        // Redirige al usuario o muestra un mensaje de éxito
        this.navCtrl.navigateForward('/login');
      }
    }
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
