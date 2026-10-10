import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseAPI } from 'src/app/app.module';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private http:HttpClient) { }

  SingUpAndLogin(user:string, email:string, password:string): Observable<any> {
    return this.http.post<any>(baseAPI+'/api/User/SingUp', {
      "name": user,
      "email": email,
      "password": password
    });
  }

  Login(dto: LoginDTO): Observable<any>{
    console.log('Objeto antes do POST:', dto);
    console.log('JSON serializado:', JSON.stringify(dto));
    return this.http.post<any>(baseAPI+'/api/User/Login', dto)
  }
}
export interface LoginDTO {
  nameOrEmail: string;
  password: string;
}
