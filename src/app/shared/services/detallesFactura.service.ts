import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetalleFactura, Factura } from '../models/factura.interface';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {

  constructor(private http: HttpClient) { }


  getByIdFactura(idFactura: number): Observable<DetalleFactura[]> {
    return this.http
      .get<DetalleFactura[]>(`${environment.URL}detalleFacturaById/${idFactura}`)
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