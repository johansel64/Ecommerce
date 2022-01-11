import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroProductosRoutingModule } from './registro-productos-routing.module';
import { RegistroProductosComponent } from './registro-productos.component';
import { MaterialModule } from 'src/app/material.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalRegistroProductosComponent } from './modal-registro-productos/modal-registro-productos.component';


@NgModule({
  declarations: [
    RegistroProductosComponent,
    ModalRegistroProductosComponent
  ],
  imports: [
    CommonModule,
    RegistroProductosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RegistroProductosModule { }
