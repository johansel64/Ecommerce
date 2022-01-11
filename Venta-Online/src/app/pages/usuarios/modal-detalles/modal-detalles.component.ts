import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import { RegisterFormBase } from 'src/app/shared/Utils/registerForms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-detalles',
  templateUrl: './modal-detalles.component.html',
  styleUrls: ['./modal-detalles.component.scss'],
})
export class ModalDetallesComponent implements OnInit {
  constructor(
    private userSrv: UserService,
    public formRegister: RegisterFormBase,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalDetallesComponent>,
  ) {}

  ngOnInit(): void {
    this.pathFormData();
  }
  //Rellena los espacios con la informacion proveniente de la lista de usuarios
  pathFormData() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formmatedDate = datepipe.transform(
      this.data?.usuario.tbPersona.fechaNac,
      'yyyy-MM-dd'
    );

    this.formRegister.baseForm.patchValue({
      id: this.data?.usuario.idUsuario,
      nombreUsuario: this.data?.usuario.nombreUsuario,
      email: this.data?.usuario.email,
      role: this.data?.usuario.role,

      nombre: this.data?.usuario.tbPersona.nombre,
      apellido1: this.data?.usuario.tbPersona.apellido1,
      apellido2: this.data?.usuario.tbPersona.apellido2,
      fechaNac: formmatedDate,
      telefono: this.data?.usuario.tbPersona.telefono,

      provincia: this.data?.usuario.tbDireccion.provincia,
      canton: this.data?.usuario.tbDireccion.canton,
      ubicacionExacta: this.data?.usuario.tbDireccion.ubicacionExacta,
    });
  }

  //Actualiza el usuario con los cambios realizados

  update() {
    const usuario = this.formRegister.baseForm.value;
    this.userSrv.update(usuario).subscribe(
      (data) => {
        this.showModal("success", "Usuario modificado");
        this.dialogRef.close()
      },
      (err) => {
        this.showModal("error", err);
      }
    );
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
