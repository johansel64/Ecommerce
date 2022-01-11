import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss'],
})
export class ModalEliminarComponent implements OnInit {
  constructor(
    private userSrv: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEliminarComponent>,
  ) {}

  ngOnInit(): void {}
    //Elimina logicamente el usuario de la BD
  delete() {
    const { id } = this.data;
    if (id) {
      this.userSrv.delete(id).subscribe(
        (data) => {
          this.showModal("success", "Usuario Eliminado");
          this.dialogRef.close();
        },
        (err) => {
          this.showModal("error", err);
        }
      );
    }
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
