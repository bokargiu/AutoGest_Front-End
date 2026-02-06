import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  SingUpAndLogin(user:string, email:string, password:string): Observable<any> {
    return this.http.post('http://localhost:5169/api/User/SingUp', {
      "username": user,
      "email": email,
      "password": password
    });
  }

  Login(userOrEmail:string, password:string): Observable<any>{
    return this.http.post<any>('http://localhost:5169/api/User/Login', {
        "userOrEmail": userOrEmail,
        "password": password
      }
    )
  }
}
