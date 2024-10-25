import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoListPageRoutingModule } from './producto-list-routing.module';

import { ProductoListPage } from './producto-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoListPageRoutingModule
  ],
  declarations: [ProductoListPage]
})
export class ProductoListPageModule {}
