import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoAddPageRoutingModule } from './producto-add-routing.module';

import { ProductoAddPage } from './producto-add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoAddPageRoutingModule,
    ReactiveFormsModule,   
  ],
  declarations: [ProductoAddPage]
})
export class ProductoAddPageModule {}
