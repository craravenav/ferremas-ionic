import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { TiendaPageRoutingModule } from './tienda-routing.module';

import { TiendaPage } from './tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    MatButtonModule,
    TiendaPageRoutingModule
  ],
  declarations: [TiendaPage]
})
export class TiendaPageModule {}
