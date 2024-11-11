import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Network } from '@capacitor/network'; // Asegúrate de instalar @capacitor/network

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Verifica la conexión a Internet
    this.checkInternetConnection();
  }

  async checkInternetConnection() {
    const status = await Network.getStatus();

    if (!status.connected) {
      this.showNoConnectionAlert();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000); // 4000ms = 4 segundos
    } else {
      // Si hay conexión, redirige al login después de 4 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000); // 4000ms = 4 segundos
    }
  }

  async showNoConnectionAlert() {
    const alert = await this.alertController.create({
      header: 'Sin Conexión',
      message: 'No tienes conexión a Internet. Por favor, revisa tu conexión.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
