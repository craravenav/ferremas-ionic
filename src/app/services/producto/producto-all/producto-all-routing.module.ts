import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoAllPage } from './producto-all.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoAllPageRoutingModule {}
