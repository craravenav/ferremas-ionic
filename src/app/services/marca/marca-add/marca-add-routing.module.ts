import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcaAddPage } from './marca-add.page';

const routes: Routes = [
  {
    path: '',
    component: MarcaAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcaAddPageRoutingModule {}
