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
    return this.http.post(baseAPI+'/api/User/SingUp', {
      "username": user,
      "email": email,
      "password": password
    });
  }

  Login(userOrEmail:string, password:string): Observable<any>{
    return this.http.post<any>(baseAPI+'/api/User/Login', {
        "userOrEmail": userOrEmail,
        "password": password
      }
    )
  }
}
