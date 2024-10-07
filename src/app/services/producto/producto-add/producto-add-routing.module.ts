import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoAddPage } from './producto-add.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoAddPageRoutingModule {}
