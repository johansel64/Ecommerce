import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from 'src/app/shared/models/usuarios.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalDetallesComponent } from './modal-detalles/modal-detalles.component';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'correo',
    'nombre',
    'apellido1',
    'apellido2',
    'detalle',
    'eliminar',
  ];
  dataSource: MatTableDataSource<Usuarios>;
  registros = 0;

  constructor(private userSrv: UserService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(null!);
  }

  ngOnInit(): void {
    this.refreshList();
  }
  ////Metodo para actualizar la lista de usuarios
  refreshList() {
    this.userSrv.getAll().subscribe((data) => {
      this.dataSource.data = data;
      if (this.dataSource.data.length) {
        this.registros = this.dataSource.data.length;
      }
    });
  }

  //Metodo para abrir el modal de Detalles

  detalles( usuario: Usuarios){
    let modal = this.dialog.open(ModalDetallesComponent, {
      height: '600px',
      width: '450px',
      data: { usuario },
    });
    modal.afterClosed().subscribe((data) => {
      this.refreshList();
    });
  }

  //Metodo para abrir el modal de Eliminar

  delete(id: number) {
    let modal = this.dialog.open(ModalEliminarComponent, {
      height: '135px',
      width: '',
      data: { id },
    });
    modal.afterClosed().subscribe((data) => {
      this.refreshList();
    });
  }


}
