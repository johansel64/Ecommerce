import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MaterialModule } from 'src/app/material.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';
import { ModalDetallesComponent } from './modal-detalles/modal-detalles.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    ModalEliminarComponent,
    ModalDetallesComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
