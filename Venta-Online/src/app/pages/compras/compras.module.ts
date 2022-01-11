import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { ComprasComponent } from './compras.component';
import { ModalComprasComponent } from './modal-compras/modal-compras.component';
import { MaterialModule } from 'src/app/material.modules';


@NgModule({
  declarations: [
    ComprasComponent,
    ModalComprasComponent
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    MaterialModule
  ]
})
export class ComprasModule { }
