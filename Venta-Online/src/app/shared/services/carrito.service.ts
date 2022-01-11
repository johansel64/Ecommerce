import { Injectable } from '@angular/core';
import { carritoProductos } from '../models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: carritoProductos | any;
  articulosCarrito: [] | any;
  constructor() {
    this.articulosCarrito = JSON.parse(localStorage.getItem('carritoProductos')!) || [];
   }

  carritoCreate(producto:any) {
    const { idProducto, nombre, URLimagen, precioUnitario, cantidad } = producto;
    this.carrito = {
      id: idProducto,
      nombre: nombre,
      URLimagen: URLimagen,
      cantidad: cantidad,
      cantidadCompra: 1,
      precioUnitario: precioUnitario,
      precioTotal: precioUnitario
    }
    const {id} = this.carrito;
    const existe = this.articulosCarrito.some( (producto:any) => producto.id === id);
    if(existe){
        //Actualiza la cantidad y agregamos el precio total
        const productos = this.articulosCarrito.map( (producto:any) => {    
            if(producto.id === id && producto.cantidad > producto.cantidadCompra){
                let totalSuma = producto.precioUnitario * (producto.cantidadCompra + 1);
                producto.precioTotal = totalSuma;
                producto.cantidadCompra++;
                return producto;
            }else{
                return producto;
            }
        });
        this.articulosCarrito = [...productos];
        
    }else{
        //Agregar elementos al arreglo de carrito
        this.articulosCarrito =  [...this.articulosCarrito, this.carrito];;

    }
    
    this.sirconizarStorage(this.articulosCarrito);
  }
  
  sirconizarStorage(articulosCarrito:any) {
    localStorage.setItem('carritoProductos', JSON.stringify(articulosCarrito));
  }

}

