import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/Interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:5169/api/Service');
  }
  postService(dto:Service){
    return this.http.post('http://localhost:5169/api/Service',{
      'title': dto.title,
      'durationMin': dto.durationMin,
      'price': dto.price
    })
  }
  deleteService(id:string){
    return this.http.delete('http://localhost:5169/api/Service/' + id);
  }
  patchService(dto:Service){
    return this.http.patch('http://localhost:5169/api/Service/'+ dto.id,{
      'title': dto.title,
      'durationMin': dto.durationMin,
      'price': dto.price
    })
  }
}