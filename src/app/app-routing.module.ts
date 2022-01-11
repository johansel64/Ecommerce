import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) }, 
  { path: 'admin', loadChildren: () => import('./pages/admin/admin/admin.module').then(m => m.AdminModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'resgistroProductos', loadChildren: () => import('./pages/registro-productos/registro-productos.module').then(m => m.RegistroProductosModule) },
  { path: 'carritoCompras', loadChildren: () => import('./pages/carrito-compras/carrito-compras.module').then(m => m.CarritoComprasModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'factura', loadChildren: () => import('./pages/factura/factura.module').then(m => m.FacturaModule) },
  { path: 'compras', loadChildren: () => import('./pages/compras/compras.module').then(m => m.ComprasModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
