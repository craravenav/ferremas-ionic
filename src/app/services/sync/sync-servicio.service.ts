import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { AuthService } from '../auth.service'; 
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  private isConnected: boolean = true;

  constructor(private authService: AuthService) {
    this.monitorNetwork();
    this.syncOnceOnStart();
  }

  // Monitorea el estado de la red
  private async monitorNetwork() {
    const status = await Network.getStatus();
    this.isConnected = status.connected;

    Network.addListener('networkStatusChange', (status) => {
      this.isConnected = status.connected;
      if (this.isConnected) {
        this.authService.sincronizarUsuarios();
      }
    });
  }

  private syncOnceOnStart() {
    if (this.isConnected) {
      this.authService.sincronizarUsuarios();  
    }
  }

}