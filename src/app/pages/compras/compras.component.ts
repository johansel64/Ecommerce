import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Factura, FacturaCarrito } from 'src/app/shared/models/factura.interface';
import { FacturaService } from 'src/app/shared/services/factura.service';
import { ModalComprasComponent } from './modal-compras/modal-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  displayedColumns: string[] = [
    'idFactura',
    'comprador',
    'email',
    'totalFactura',
    'detalles'
  ];

  dataSource: MatTableDataSource<Factura>;

  constructor(private FacturaSrv: FacturaService, private dialog: MatDialog) { 
    this.dataSource = new MatTableDataSource(null!);
  }

  //Carga todas las facturas al inicializar
  ngOnInit(): void {
    this.getAllFacturas();
  }

  //Obtiene todo las facturas usando el Servicio
  getAllFacturas() {
    this.FacturaSrv.getAll().subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
    })
  }

  //Envia los detalles al modal para que estos puedan ser mostrados
  detalles( id: number){
    let modal = this.dialog.open(ModalComprasComponent, {
      height: '',
      width: '80vw',
      data: { id },
    });
  }


}
