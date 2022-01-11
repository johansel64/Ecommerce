import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class RegisterFormBase {
  constructor(private fb: FormBuilder) {}

 //Declaraciones de informacion requerida para el formulario.

  baseForm = this.fb.group({
    id: [''],
    nombreUsuario: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
    
    nombre: ['', [Validators.required, Validators.maxLength(30)]],
    apellido1: ['', [Validators.required, Validators.maxLength(30)]],
    apellido2: ['', [Validators.required, Validators.maxLength(30)]],
    fechaNac: ['', [Validators.required]],
    telefono: ['', [Validators.required]],

    provincia: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    ubicacionExacta: ['', [Validators.required]]

  });

  reset() {
    this.baseForm.reset();
  }
}

