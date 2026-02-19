import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/AuthService/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const tk = auth.getToken();
  if(!tk){
    return next(req)
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${tk}`
    }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status == 401){
        auth.Logout();
      }
      return throwError(()=> error);
    })
  );
};
