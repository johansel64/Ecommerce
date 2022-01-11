import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { carritoProductos } from 'src/app/shared/models/productos.interface';
import { CarritoService } from 'src/app/shared/services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.scss']
})
export class CarritoComprasComponent implements OnInit {
  articulosCarrito: [] | any;
  hasData: boolean = false;
  displayedColumns: string[] = [
    'id',
    'nombre',
    'cantidadCompra',
    'URLimagen',
    'precioUnitario',
    'precioTotal',
    'acciones'
  ];
  dataSource: MatTableDataSource<carritoProductos>;
  constructor(private carServ: CarritoService) {
    this.articulosCarrito = JSON.parse(localStorage.getItem('carritoProductos')!) || [];
    this.dataSource = new MatTableDataSource(null!);
  }

  ngOnInit(): void {
    this.refrescarCarrito(this.articulosCarrito);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //Elimina los productos del carrito y refresca.
  eliminarProducto(producto: any){
    const {id} = producto;
    this.articulosCarrito = this.articulosCarrito.filter( (producto:any) => producto.id !== id);
    this.refrescarCarrito(this.articulosCarrito);

    window.setTimeout(() => {
      window.location.reload();
    }, 2000)
  }

  refrescarCarrito(articulosCarrito: any) {
    this.carServ.sirconizarStorage(articulosCarrito);
    if(articulosCarrito.length == 0) {
      this.hasData = false;
    }else{
      this.dataSource = articulosCarrito;
      this.hasData = true;
    }

    console.log(this.hasData);
    

  }

  showModalDelete(producto: any) {
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
          'Tu producto ha sido eliminado del carrito.',
          'success'
        )
        this.eliminarProducto(producto);
      }
    })
  }

}


