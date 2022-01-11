import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritoComprasRoutingModule } from './carrito-compras-routing.module';
import { CarritoComprasComponent } from './carrito-compras.component';
import { MaterialModule } from 'src/app/material.modules';


@NgModule({
  declarations: [
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    CarritoComprasRoutingModule,
    MaterialModule,
  ]
})
export class CarritoComprasModule { }
