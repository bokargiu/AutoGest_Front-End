import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from "primeng/ripple";
import { ButtonDirective } from "primeng/button";
import { AuthService } from 'src/app/Services/AuthService/auth.service';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    AvatarModule,
    Ripple,
],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(private _auth:AuthService){}
  logout(){
    this._auth.Logout();
  }
}
