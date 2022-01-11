import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { productos } from 'src/app/shared/models/productos.interface';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { ModalRegistroProductosComponent } from './modal-registro-productos/modal-registro-productos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.scss']
})
export class RegistroProductosComponent implements OnInit {

  hasData: boolean = false;
  getIdUser = localStorage.getItem('userId');
  displayedColumns: string[] = [
    'idProducto',
    'nombre',
    'precioUnitario',
    'URLimagen',
    'acciones',
  ];
  dataSource: MatTableDataSource<productos>;
  constructor(private prodService: ProductosService, private dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(null!);
  }

  ngOnInit(): void {
    this.refreshList();
  }
  //Aplica un filtro de Paginado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Abre el modal con el producto seleccionado
  openModal(producto = null): void {
    let modal = this.dialog.open(ModalRegistroProductosComponent,{
      height:'700px',
      width:'600px',
      data:{producto}
    });
    modal.afterClosed().subscribe(data => {
      this.refreshList();
    })
  }

  //Actualiza la lista de productos
  refreshList():void {
    this.prodService.getAllByUser(this.getIdUser).subscribe(result => {
      if(result.length == 0){
        this.hasData = false;
      }else{
        this.dataSource.data = result;
        this.hasData = true;
      }
    },(error) => {
      this.showModal("error", error);
    });
    
  }

  eliminarProducto(id: number){
    this.prodService.delete(id).subscribe(result => {
      this.refreshList();
    }, error => {
      this.showModal("error", error);
    })
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

  openModalDelete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Tu producto ha sido eliminado.',
          'success'
        )
        this.eliminarProducto(id);
      }
    })
  }

}
