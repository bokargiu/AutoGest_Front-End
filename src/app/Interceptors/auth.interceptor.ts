import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/AuthService/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _auth = inject(AuthService);
  if(!_auth.TokenValid()) return next(req);
  const tk = _auth.getToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tk}`
    }
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status == 401){
        _auth.Logout();
      }
      return throwError(()=> error);
    })
  );
};
