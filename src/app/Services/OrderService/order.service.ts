import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderDto } from 'src/app/Interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5169/api/Order');
  }
  post(dto: OrderDto) {
    return this.http.post('http://localhost:5169/api/Order', dto);
  }
  delete(id: string) {
    return this.http.delete('http://localhost:5169/api/Order/' + id);
  }
  }
