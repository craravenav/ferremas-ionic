import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcaEditPageRoutingModule } from './marca-edit-routing.module';

import { MarcaEditPage } from './marca-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcaEditPageRoutingModule
  ],
  declarations: [MarcaEditPage]
})
export class MarcaEditPageModule {}
