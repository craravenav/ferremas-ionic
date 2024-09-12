import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { customPasswordValidator } from '../../custom-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  loginForm!: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, customPasswordValidator()]]
    });
  }

  ngOnInit() {
  }

  async login() {
    if (this.loginForm.valid) {
      console.log('Formulario de inicio de sesión válido');
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const usuario = email.split('@')[0];

      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuario,
          email: email,
          password: password
        }
      };
      this.router.navigate(['tienda'], navigationExtras);
    } else {
      // Si el formulario no es válido, muestra una alerta
      await this.showErrorAlert();
    }
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error en el Inicio de Sesión',
      message: 'Todos los campos son obligatorios y la contraseña debe cumplir con los requisitos.',
      buttons: ['OK']
    });

    await alert.present();
  }
}

