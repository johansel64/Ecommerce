import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user.interface';
import { map,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private user= new BehaviorSubject<UserResponse>(null!);

  getUser$(): Observable<UserResponse>{
    return this.user.asObservable();
  }



  constructor(private http: HttpClient, private route: Router) {}

    
    onLogin(userData: User):Observable <UserResponse> {
      return this.http.post<UserResponse>(`${environment.URL}auth/login`, userData).pipe(
        map((user:UserResponse) => {
          //Guardar datos en localstorage 
          this.saveStorage(user);
          this.user.next(user);
          window.location.href = "http://localhost:4200/home"
          return user;

        }), catchError((error) => this.handleError(error)));
    };
  
    //Remueve todos los autenticadores y devuelve a la pagipa de inicio
    onLogout():void{
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      window.location.href = "http://localhost:4200/home"
      
    }

    //Almacena los autenticadores de en localStorage
    saveStorage(user: UserResponse):void {
      const {token, role, usuario} = user;

      localStorage.setItem('userRole', role);
      localStorage.setItem('userToken', token);
      localStorage.setItem('userId', usuario);
    }

    handleError(error: any): Observable<never>{
      let mensajeError = 'Error desconocido';

      if(error) {
        mensajeError = `Error: ${error.error.mensaje}`;
      }

      return throwError(mensajeError);
    }
}
