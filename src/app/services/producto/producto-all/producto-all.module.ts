import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoAllPageRoutingModule } from './producto-all-routing.module';

import { ProductoAllPage } from './producto-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoAllPageRoutingModule
  ],
  declarations: [ProductoAllPage]
})
export class ProductoAllPageModule {}
