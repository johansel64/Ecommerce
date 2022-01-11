import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleFactura } from 'src/app/shared/models/factura.interface';
import { DetalleFacturaService } from 'src/app/shared/services/detallesFactura.service';

@Component({
  selector: 'app-modal-compras',
  templateUrl: './modal-compras.component.html',
  styleUrls: ['./modal-compras.component.scss'],
})
export class ModalComprasComponent implements OnInit {
//Muestra las columnas que se desean extraer de la BD
  displayedColumns: string[] = [
    'idDetalle',
    'nombre',
    'descripcion',
    'precio',
    'cantidad',
    'total',
    'imagen'

  ];

  dataSource: MatTableDataSource<DetalleFactura>;
  //Se injectan todos los componentes que se utilizaran
  constructor(
    private detallesFacturaSrv: DetalleFacturaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalComprasComponent>
  ) {
    this.dataSource = new MatTableDataSource(null!);
  }

  //Carga los datos al inicializar el modal 
  ngOnInit(): void {
    
    const { id } = this.data; 
    console.log(id);
    
    this.detallesFacturaSrv.getByIdFactura(id).subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    })
  }
}
