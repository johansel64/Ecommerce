import { Component, OnInit } from '@angular/core';
import { imagenes, productos } from 'src/app/shared/models/productos.interface';
import { CarritoService } from 'src/app/shared/services/carrito.service';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productosCompu: productos[] = [];
  productosCel: productos[] = [];

  imagesForSlider = [
    {path: 'https://www.ing.uc.cl/ingenieria-y-gestion-construccion/wp-content/uploads/2018/07/banner-tecnologia.jpg'},
    {path: 'https://static.vecteezy.com/system/resources/previews/000/693/159/large_2x/technology-banner-background-with-connecting-dotted-design-vector.jpg'},
    {path: 'https://static.vecteezy.com/system/resources/previews/000/693/757/large_2x/technology-banner-background-with-polygon-connecting-shapes-vector.jpg '},
    {path: 'https://static.vecteezy.com/system/resources/previews/000/693/768/large_2x/digital-connecting-banner-technology-polygon-background-vector.jpg'},
    {path: 'https://static.vecteezy.com/system/resources/previews/000/693/160/large_2x/technology-banner-background-with-connecting-dotted-design-vector.jpg'}
];
  

  constructor(private prodServ: ProductosService, private servCarrito: CarritoService) { }

  ngOnInit(): void {
    this.cargarProductosCompu("computo");
    this.cargarProductosCel("telefonia");
    
  }

  //Realiza un filtrado de los productos por medio del tipo
  cargarProductosCompu(tipo: string) {
    this.prodServ.getAllByType(tipo).subscribe(products => {
      this.productosCompu = products;
    }, err => alert(err));
  }

  cargarProductosCel(tipo: string) {
    this.prodServ.getAllByType(tipo).subscribe(products => {
      this.productosCel = products;
    }, err => alert(err));
  }

    //Agrega al carrito, enviando un producto
    addCarrito(producto: any) {
      this.servCarrito.carritoCreate(producto);
    }


}
