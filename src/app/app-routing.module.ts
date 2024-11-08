import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard'; // Importamos el AuthGuard

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then(m => m.LoaderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'producto-add',
    loadChildren: () => import('./services/producto/producto-add/producto-add.module').then( m => m.ProductoAddPageModule)
  },
  {
    path: 'producto-edit/:id',
    loadChildren: () => import('./services/producto/producto-edit/producto-edit.module').then( m => m.ProductoEditPageModule)
  },
  {
    path: 'producto-all',
    loadChildren: () => import('./services/producto/producto-all/producto-all.module').then( m => m.ProductoAllPageModule)
  },
  {
    path: 'marca-add',
    loadChildren: () => import('./services/marca/marca-add/marca-add.module').then( m => m.MarcaAddPageModule)
  },
  {
    path: 'marca-all',
    loadChildren: () => import('./services/marca/marca-all/marca-all.module').then( m => m.MarcaAllPageModule)
  },
  {
    path: 'marca-edit',
    loadChildren: () => import('./services/marca/marca-edit/marca-edit.module').then( m => m.MarcaEditPageModule)
  },
  {
    path: 'categoria-add',
    loadChildren: () => import('./services/categoria/categoria-add/categoria-add.module').then( m => m.CategoriaAddPageModule)
  },
  {
    path: 'categoria-edit',
    loadChildren: () => import('./services/categoria/categoria-edit/categoria-edit.module').then( m => m.CategoriaEditPageModule)
  },
  {
    path: 'categoria-all',
    loadChildren: () => import('./services/categoria/categoria-all/categoria-all.module').then( m => m.CategoriaAllPageModule)
  },
  {
    path: 'producto-list',
    loadChildren: () => import('./services/producto/producto-list/producto-list.module').then( m => m.ProductoListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'producto-delete',
    loadChildren: () => import('./services/producto/producto-delete/producto-delete.module').then( m => m.ProductoDeletePageModule)
  },


  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then(m => m.TiendaPageModule),
    canActivate: [AuthGuard] // Protección de ruta con el guard
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoPageModule),
    canActivate: [AuthGuard] // Protección de ruta con el guard
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutPageModule),
    canActivate: [AuthGuard] // Protección de ruta con el guard
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
