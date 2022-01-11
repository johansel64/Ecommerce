import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetalleFactura, Factura } from '../models/factura.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  //Guarda una Factura

  save(factura: Factura): Observable<any> {
    return this.http.post<Factura>(`${environment.URL}factura`,factura)
    .pipe(catchError((err) => this.handleError(err)));

  }

    //Guarda el detalle de la factura
  saveDetail(detalle: DetalleFactura):Observable<any> {
    
      return this.http.post<DetalleFactura>(`${environment.URL}detalleFactura`,detalle)
        .pipe(catchError((err) => this.handleError(err)));
   
    
  }

  //Obtiene todas las facturas
  getAll(): Observable<Factura[]> {
    return this.http
      .get<Factura[]>(`${environment.URL}factura`)
      .pipe(catchError(this.handleError));
  }


  handleError(error: any): Observable<never> {
    let mensajeError = 'Error desconocido';

    if(error){
      mensajeError = `Error: ${error.error.mensaje}`;
    }
    return throwError(mensajeError);

  } 
}
 