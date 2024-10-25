import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoDeletePageRoutingModule } from './producto-delete-routing.module';

import { ProductoDeletePage } from './producto-delete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoDeletePageRoutingModule
  ],
  declarations: [ProductoDeletePage]
})
export class ProductoDeletePageModule {}
