import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { customPasswordValidator } from '../../custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, customPasswordValidator()]]
    });

    // Obtiene los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.data = params;
      console.log('Datos recibidos:', this.data); // Datos del formulario de registro

      this.checkForRegistrationSuccess();
    });
  }

  async checkForRegistrationSuccess() {
    const registrationSuccess = this.data.registrationSuccess;
    
    if (registrationSuccess === 'true') {
      await this.showSuccessAlert();
      // Limpia los parámetros de consulta
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { registrationSuccess: null },
        queryParamsHandling: 'merge',
      });
    }
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso',
      message: 'El registro se ha realizado correctamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async login() {
    if (this.loginForm.valid) {
      // Aquí puedes implementar la lógica para iniciar sesión
      console.log('Formulario de inicio de sesión válido');
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

