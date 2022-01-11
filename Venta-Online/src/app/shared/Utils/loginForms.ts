import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Injectable({providedIn:"root"})
export class LoginFormBase {
    constructor(private fb: FormBuilder){

    }
    //Declaraciones de informacion requerida para el formulario.
    baseForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    reset(){
        this.baseForm.reset();
    }

}