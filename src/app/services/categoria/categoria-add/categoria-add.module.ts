import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaAddPageRoutingModule } from './categoria-add-routing.module';

import { CategoriaAddPage } from './categoria-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaAddPageRoutingModule
  ],
  declarations: [CategoriaAddPage]
})
export class CategoriaAddPageModule {}
