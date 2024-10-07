import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaAllPage } from './categoria-all.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaAllPageRoutingModule {}
