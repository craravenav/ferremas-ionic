import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaAllPageRoutingModule } from './categoria-all-routing.module';

import { CategoriaAllPage } from './categoria-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaAllPageRoutingModule
  ],
  declarations: [CategoriaAllPage]
})
export class CategoriaAllPageModule {}
