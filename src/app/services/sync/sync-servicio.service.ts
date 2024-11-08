import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { AuthService } from '../auth.service'; // Importa el servicio AuthService

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private isConnected: boolean = true;

  constructor(private authService: AuthService) {
    this.monitorNetwork();
  }

  // Monitorea el estado de la red
  private async monitorNetwork() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;

    Network.addListener('networkStatusChange', (status) => {
      this.isConnected = status.connected;
      if (this.isConnected) {
        this.sincronizarUsuarios();
      }
    });
  }

  // Sincroniza los usuarios no sincronizados
  private async sincronizarUsuarios() {
    const usuariosPendientes = await this.authService.obtenerUsuariosNoSincronizados();

    for (const usuario of usuariosPendientes) {
      const exito = await this.authService.guardarEnJsonServer(usuario);
      if (exito) {
        await this.authService.marcarComoSincronizado(usuario.id);
        console.log(`Usuario ${usuario.id} sincronizado correctamente.`);
      }
    }
  }
}