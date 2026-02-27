import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/Interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>('http://localhost:5169/api/Client');
  }
  postClient(dto:Client){
    return this.http.post('http://localhost:5169/api/Client',{
      'name': dto.name,
      'number': dto.number,
      'rating': dto.rating
    })
  }
  deleteClient(id:string){
    return this.http.delete('http://localhost:5169/api/Client/' + id);
  }
  patchClient(dto:Client){
    return this.http.patch('http://localhost:5169/api/Client/'+ dto.id,{
      'name': dto.name,
      'number': dto.number,
      'rating': dto.rating
    })
  }
}
