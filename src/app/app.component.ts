import { Component } from '@angular/core';
import { SyncService } from '../app/services/sync/sync-servicio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private syncService: SyncService){}
}
