import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcaAllPageRoutingModule } from './marca-all-routing.module';

import { MarcaAllPage } from './marca-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcaAllPageRoutingModule
  ],
  declarations: [MarcaAllPage]
})
export class MarcaAllPageModule {}
