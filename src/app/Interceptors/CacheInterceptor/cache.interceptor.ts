import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CacheService, Key } from 'src/app/Services/CacheService/cache.service';

export const cacheInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const _cache = inject(CacheService);
  const key:Key | null = req.params.get('KEY') ? Number(req.params.get('KEY')) : null;
  if(key === null)
    return next(req);

  const cached = _cache.get(key);

  if(req.method === 'GET')
  {
    if(cached){
      return of(new HttpResponse({
        body: cached,
        status: 200
      }));
    }
    return next(req).pipe(
      tap((event) => {
        if(event instanceof HttpResponse){
          _cache.set(key, event.body)
        }
      })
    );
  }
  else{
    return next(req).pipe(
      tap((event) => {
        if(event instanceof HttpResponse){
          _cache.clear(key);
        }
      })
    );
  }
};
