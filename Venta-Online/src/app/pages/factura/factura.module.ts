import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';
import { MaterialModule } from 'src/app/material.modules';


@NgModule({
  declarations: [
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    MaterialModule
  ]
})
export class FacturaModule { }
