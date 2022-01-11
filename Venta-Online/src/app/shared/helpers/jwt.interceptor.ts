import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  //Utilizado para validar que el todos los parametros de seguridad se encuentren vigentes para su correcto funcionamiento.

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('userToken');

    if (token) {
      request = request.clone({
        headers: request.headers.set('auth', token)
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        //Valida si el error es igual 401 para remover las diferentes variables
        if (err.status === 401) {
          localStorage.removeItem('userToken')
          localStorage.removeItem('userRole')
          localStorage.removeItem('userId')
          this.router.navigate(['login']);
        }

        return throwError( err );

      })
    );
  }
  
}
