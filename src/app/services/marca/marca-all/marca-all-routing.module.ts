import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcaAllPage } from './marca-all.page';

const routes: Routes = [
  {
    path: '',
    component: MarcaAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcaAllPageRoutingModule {}
