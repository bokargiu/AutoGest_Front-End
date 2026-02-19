import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  TokenValid(): boolean{
    const token = this.getToken();
    if(!token) return false;
     try{
      const decoded: any = jwtDecode(token);
      const expired: any = decoded.exp * 1000 < Date.now();
      if(expired) {
        this.Logout()
        return false;
      }
      return true;
     }
     catch{
      this.Logout();
      return false
     }
  }
  Logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"])
  }
  getToken(){
    return localStorage.getItem("token");
  }
}
