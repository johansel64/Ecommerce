import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ProductosFormBase {
  constructor(private fb: FormBuilder) {}
  //Declaraciones de informacion requerida para el formulario.
  baseForm = this.fb.group({
    idProducto: [''],
    cantidad: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    URLimagen: ['', [Validators.required]],
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    precioUnitario: ['', [Validators.required]],
    nombreTipoProducto: ['', [Validators.required]],
    idUsuario: ['', [Validators.required]],
  
  });

  reset() {
    this.baseForm.reset();
  }
}