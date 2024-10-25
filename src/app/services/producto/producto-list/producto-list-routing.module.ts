import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoListPage } from './producto-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoListPageRoutingModule {}
