import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDate, ServiceMin } from 'src/app/Interfaces/service';
import { Key } from '../CacheService/cache.service';
import { baseAPI } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<ServiceMin[]> {
    return this.http.get<ServiceMin[]>(baseAPI+'/api/Service', { params: {'KEY': Key.Service}});
  }
  postService(dto:ServiceDate){
    return this.http.post(baseAPI+'/api/Service',{
      'title': dto.title,
      'durationMin': dto.duration.getHours() * 60 + dto.duration.getMinutes(),
      'price': dto.price
    }, { params: {'KEY': Key.Service}})
  }
  deleteService(id:string){
    return this.http.delete(baseAPI+'/api/Service/' + id, { params: {'KEY': Key.Service}});
  }
  patchService(dto:ServiceDate){
    return this.http.patch(baseAPI+'/api/Service/'+ dto.id,{
      'title': dto.title,
      'durationMin': dto.duration.getHours() * 60 + dto.duration.getMinutes(),
      'price': dto.price
    }, { params: {'KEY': Key.Service}})
  }
}