import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { RegisterFormBase } from 'src/app/shared/Utils/registerForms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userSrv: UserService,
    public formRegister: RegisterFormBase,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log(this.formRegister.baseForm.value)
  }

  // Metodo usado para registrar el usuario en BD
  registrar(){
    //if (this.formRegister.baseForm.invalid) return;
    const usuario = this.formRegister.baseForm.value;
  
    console.log(usuario)
    this.userSrv.save(usuario).subscribe((datos) => {
      this.showModal("success", "Usuario registrado");
      this.route.navigate(['login'])
    }, (err) => {
      this.showModal("error", err);
    });

  }

  showModal(icon: any, titulo: string){
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: titulo,
      showConfirmButton: false,
      timer: 3000
    })
  }

}