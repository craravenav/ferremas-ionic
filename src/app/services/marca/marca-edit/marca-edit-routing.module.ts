import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcaEditPage } from './marca-edit.page';

const routes: Routes = [
  {
    path: '',
    component: MarcaEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcaEditPageRoutingModule {}
