import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroProductosComponent } from './registro-productos.component';

const routes: Routes = [{ path: '', component: RegistroProductosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroProductosRoutingModule { }
