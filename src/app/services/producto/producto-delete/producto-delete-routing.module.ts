import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoDeletePage } from './producto-delete.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoDeletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoDeletePageRoutingModule {}
