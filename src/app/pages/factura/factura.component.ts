import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DetalleFactura, FacturaCarrito, Factura } from 'src/app/shared/models/factura.interface';
import { productos } from 'src/app/shared/models/productos.interface';
import { FacturaService } from 'src/app/shared/services/factura.service';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  private factura: Factura | any
  productosCarrito: [] | any;
  private detalles: DetalleFactura | any;
  private producto: productos | any;
  hasData: boolean = false;

  displayedColumns: string[] = [
    'id',
    'cantidad',
    'nombre',
    'precioUnitario',
    'precioTotal'
  ];

  dataSource: MatTableDataSource<FacturaCarrito>;
  


  constructor(private srvFacturas: FacturaService, private srvProductos: ProductosService,private router:Router) {
    this.productosCarrito = JSON.parse(localStorage.getItem('carritoProductos')!);

    this.dataSource = new MatTableDataSource(null!);
  }

  ngOnInit(): void {
    this.refreshFactura();
  }

  /**
   * Funcion que refresca la tabla de la factura con todos sus detalles
   */
  refreshFactura(): void {
    
    if(this.productosCarrito == 0) {
      this.hasData = false;
    } else {
      this.hasData = true;
      this.dataSource = this.productosCarrito;
    }

  }


  //Metodo encargado de la formalizacion de un producto para su compra
  formalizar(): void {
    let total = 0;
    this.detalles = this.productosCarrito;


    //Realiza la suma del precio de los productos 
    for (let i = 0; i < this.detalles.length; i++) {
      total += this.detalles[i]["precioTotal"];
    }


    this.factura = {
      totalFactura: total,
      idUsuarioFk: JSON.parse(localStorage.getItem('userId')!)
    }

    console.log(this.factura)

    this.srvFacturas.save(this.factura).subscribe((data) => {

      //Recorrido del carrito para guardar los detalles de la factura
      for (let i = 0; i < this.productosCarrito.length; i++) {

        this.producto = {
          idProducto: this.productosCarrito[i]["id"],
          cantidad: this.productosCarrito[i]["cantidadCompra"]
        }

        this.detalles = {
          cantidadProducto: this.productosCarrito[i]["cantidadCompra"],
          idFactura: data.idFactura,
          idProducto: this.producto.idProducto
        }


        this.srvProductos.updateQuantity(this.producto, this.productosCarrito[i]["id"]).subscribe((data) => { }, (error) => { alert(error); });
        this.srvFacturas.saveDetail(this.detalles).subscribe((data) => {

        }, (error) => {
          alert(error)
        })
      }

    }, (error) => {
      alert('error ' + error);
    })

    localStorage.removeItem("carritoProductos");
  }

  /**
   * Funcion para obtener el precio total de la compra 
   */
  getTotalCost() {
    return this.productosCarrito.map((carrito: { precioTotal: any; }) => carrito.precioTotal).reduce((acc: any, value: any) => acc + value, 0);
  }

  /**
   * Mensaje emergente para confirmar la compra
   */
  showConfirm() {
    Swal.fire({
      title: '¿Estas seguro que deseas formalizar la compra?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancela',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formalizar();
        Swal.fire(
          'Confirmado!',
          'Tu compra ha sido registrada con exito.',
          'success'
        ).then((res) => {
          if(res.isConfirmed) {
            window.setTimeout(() => {
              window.location.reload();
            }, 2000)
            this.router.navigate(['/compras'])
          }
        })
        
        
      }
    })
  }

}
