import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaEditPage } from './categoria-edit.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaEditPageRoutingModule {}
