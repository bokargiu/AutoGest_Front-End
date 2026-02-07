import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  TokenValid(): boolean{
    const token = localStorage.getItem("token");
    if(!token) return false;
     try{
      const decoded: any = jwtDecode(token);
      const expired: any = decoded.exp * 1000 < Date.now().valueOf();
      console.log(expired)
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
  }
}
