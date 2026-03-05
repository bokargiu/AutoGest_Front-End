import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from "primeng/ripple";
import { AuthService } from 'src/app/Services/AuthService/auth.service';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    AvatarModule,
    Ripple,
    SidebarModule,
    SideMenuComponent
],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(private _auth:AuthService){}
  sidebarVisible: boolean = false;

  logout(){
    this._auth.Logout();
  }
  isMobile(){
    return window.innerWidth < 800;
  }
}
