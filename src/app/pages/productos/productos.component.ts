import { Component, OnInit } from '@angular/core';
import { carritoProductos, productos } from 'src/app/shared/models/productos.interface';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { CarritoService } from 'src/app/shared/services/carrito.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: productos[] = [];
  articulosCarrito: [] | any;
  typeProd = sessionStorage.getItem('typeProd');
  constructor(private prodServ: ProductosService,
    private dialog: MatDialog,
    private servCarrito: CarritoService
  ) { }
  //Carga los productos al inicializar el componente 
  ngOnInit(): void {
    this.articulosCarrito = JSON.parse(localStorage.getItem('carritoProductos')!) || [];
    if (this.typeProd) {
      this.cargarProductosByType(this.typeProd);
    } else {
      this.cargarProductos();
    }
  }

  //Carga todo los productos 
  cargarProductos() {
    this.prodServ.getAll().subscribe(products => {
      this.productos = products;
    }, err => alert(err));
  }


  //Realiza un filtrado de los productos por medio del tipo
  cargarProductosByType(tipo: string) {
    this.prodServ.getAllByType(tipo).subscribe(products => {
      this.productos = products;
    }, err => alert(err));
  }

  //Abre el modal con el producto seleccionado 
  openModal(producto: any): void {
    let modal = this.dialog.open(ModalProductoComponent, {
      height: '700px',
      width: '600px',
      data: { producto }
    });
    modal.afterClosed().subscribe(() => {
      this.cargarProductos();
    })
  }


  //Agrega al carrito, enviando un producto
  addCarrito(producto: any) {
    this.servCarrito.carritoCreate(producto);
  }


}
