import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcaAddPageRoutingModule } from './marca-add-routing.module';

import { MarcaAddPage } from './marca-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcaAddPageRoutingModule
  ],
  declarations: [MarcaAddPage]
})
export class MarcaAddPageModule {}
