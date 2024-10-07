import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaEditPageRoutingModule } from './categoria-edit-routing.module';

import { CategoriaEditPage } from './categoria-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaEditPageRoutingModule
  ],
  declarations: [CategoriaEditPage]
})
export class CategoriaEditPageModule {}
