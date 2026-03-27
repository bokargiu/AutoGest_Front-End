import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceDate, ServiceMin } from 'src/app/Interfaces/service';
import { Key } from '../CacheService/cache.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<ServiceMin[]> {
    return this.http.get<ServiceMin[]>('http://localhost:5169/api/Service', { params: {'KEY': Key.Service}});
  }
  postService(dto:ServiceDate){
    return this.http.post('http://localhost:5169/api/Service',{
      'title': dto.title,
      'durationMin': dto.duration.getHours() * 60 + dto.duration.getMinutes(),
      'price': dto.price
    }, { params: {'KEY': Key.Service}})
  }
  deleteService(id:string){
    return this.http.delete('http://localhost:5169/api/Service/' + id, { params: {'KEY': Key.Service}});
  }
  patchService(dto:ServiceDate){
    return this.http.patch('http://localhost:5169/api/Service/'+ dto.id,{
      'title': dto.title,
      'durationMin': dto.duration.getHours() * 60 + dto.duration.getMinutes(),
      'price': dto.price
    }, { params: {'KEY': Key.Service}})
  }
}