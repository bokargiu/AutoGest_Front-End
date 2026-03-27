import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderDto } from 'src/app/Interfaces/Order';
import { Key } from '../CacheService/cache.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5169/api/Order', { params: {'KEY': Key.Order}});
  }
  post(dto: OrderDto) {
    return this.http.post('http://localhost:5169/api/Order', dto, { params: {'KEY': Key.Order}});
  }
  patch(id: string, dto: OrderDto) {
    return this.http.patch('http://localhost:5169/api/Order/' + id, dto, { params: {'KEY': Key.Order}});
  }
  delete(id: string) {
    return this.http.delete('http://localhost:5169/api/Order/' + id, { params: {'KEY': Key.Order}});
  }
  }
