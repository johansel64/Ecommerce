import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.modules';


@NgModule({
  declarations: [
    ProductosComponent,
    ModalProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    MatDialogModule
  ]
})
export class ProductosModule { }
