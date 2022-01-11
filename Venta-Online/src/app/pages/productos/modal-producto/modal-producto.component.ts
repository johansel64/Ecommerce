import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarritoService } from 'src/app/shared/services/carrito.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {

  producto = this.data?.producto;
  id = 0;
  cantidad = 0;
  nombre = '';
  descripcion = '';
  precioUnitario = 0;
  URLimagen = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ModalProductoComponent>,
              private servCarrito: CarritoService) { }

  ngOnInit(): void {
    this.cargarProducto();
  }

  //Carga el producto con sus respectivos datos desde la BD para ser mostrado
  cargarProducto(){
    const { id, cantidad, nombre, descripcion, precioUnitario, URLimagen } = this.data?.producto;

    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.URLimagen = URLimagen;
    
  }

  addCarrito(producto: any) {
    this.servCarrito.carritoCreate(producto);
  }

}
