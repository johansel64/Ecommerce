import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { productos } from '../models/productos.interface';

//Firabase 
import firebase from "firebase/compat/app"
import 'firebase/compat/storage'

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  storageRef = firebase.app().storage().ref();

  constructor(private http: HttpClient) { }

  //Obtiene todos los productos

  getAll(): Observable<productos[]> {

    return this.http.get<any[]>(`${environment.URL}producto`).pipe(catchError((err) => this.handleError(err)));
  }

//Obtiene los productos por medio del ID
  getAllByType(tipo:string): Observable<productos[]> {
    return this.http.get<any[]>(`${environment.URL}producto/byType/${tipo}`).pipe(catchError((err) => this.handleError(err)));

  }

  //Obtiene los productos por medio del User Id
  getAllByUser(id:any): Observable<productos[]> {
    return this.http.get<any[]>(`${environment.URL}producto/byUser/${id}`).pipe(catchError((err) => this.handleError(err)));

  }

  //Guarda un productos
  save(producto: productos): Observable<any>{
    return this.http.post<productos>(`${environment.URL}producto`,producto).pipe(catchError((err) => this.handleError(err)));
  }

  //Actualiza los productos
  update(producto: productos, id:number): Observable<any>{
    return this.http.patch<productos>(`${environment.URL}producto/${id}`,producto).pipe(catchError((err) => this.handleError(err)));
  }

  updateQuantity(producto: productos, id:number): Observable<any> {
    return this.http.patch<productos>(`${environment.URL}producto/quantity/${id}`,producto).pipe(catchError((err) => this.handleError(err)));
  }

  delete(id: number): Observable<productos[]> {
    return this.http.delete<any>(`${environment.URL}producto/${id}`).pipe(catchError(this.handleError));
  }
  
  //Carga un archivo de imagen, extrae el img64 y envia al Firebase devolviendo una ruta para tener acceso a ella
  async udploadFile(nombre: string, img64: any){
    try {
      let imagen = await this.storageRef.child(nombre).putString(img64, "data_url");
      return await imagen.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }


  
  handleError(error: any): Observable<never> {

    let mensajeError = 'Error desconocido';

    if(error){
      mensajeError = `Error: ${error.error.mensaje}`;

    }

    return throwError(mensajeError);

  } 
}


