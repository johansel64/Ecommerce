import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse } from '../models/user.interface';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userList = new BehaviorSubject<UserResponse>(null!);

  get userList$(): Observable<UserResponse> {
    return this.userList.asObservable();
  }

  constructor(private http: HttpClient, private route: Router) {}

  //Obtiene todo los datos usando la ruta de getAll

  getAll(): Observable<Usuarios[]> {
    return this.http
      .get<Usuarios[]>(`${environment.URL}usuario/`)
      .pipe(catchError(this.handleError));
  }

  //Elimina de la BD, enviando el id y validando que el rol
  delete(id: number): Observable<Usuarios> {
    var token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('auth', token);
    return this.http
      .delete<any>(`${environment.URL}usuario/${id}`, { headers: header })
      .pipe(catchError(this.handleError));

  }

  //Guarda un usuario

  save(user: Usuarios): Observable<any>{
    return this.http
      .post<any>(`${environment.URL}usuario/`,user)
      .pipe(catchError(this.handleError));
  }

  //Actualiza un Usuario
  update(user: Usuarios): Observable<any>{
    var token = localStorage.getItem('userToken')!;
    const header = new HttpHeaders().set('auth', token);
    return this.http
      .patch<any>(`${environment.URL}usuario/${user.id}`,user, { headers: header })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let mensajeError = 'Error desconocido';

    if (error) {
      mensajeError = `Error: ${error.error.mensaje}`;
    }

    return throwError(mensajeError);
  }
}
