import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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
}
