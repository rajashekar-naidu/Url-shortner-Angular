import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private _auth:AuthService, private _router:Router) {}

//   intercept(req, next) {
//     let authService = this.injector.get(AuthService)
//     let tokenizedReq = req.clone(
//       {
//         headers: req.headers.set('Authorization',authService.getToken())
//       }
//     ) 
//     return next.handle(tokenizedReq)
//   }
// } 


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._auth.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request).pipe(
      catchError(
        (err, caught) => {
          if (err.status === 401){
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }
  private handleAuthError() {
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    localStorage.removeItem('role');
    this._router.navigateByUrl('/token-expired-page');
  }
}