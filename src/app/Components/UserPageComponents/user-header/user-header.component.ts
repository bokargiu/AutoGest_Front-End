import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from "primeng/ripple";
import { AuthService } from 'src/app/Services/AuthService/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isMobile } from 'src/app/Pages/UserPages/user/user.component';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from "src/app/app-routing.module";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [
    AvatarModule,
    Ripple,
    ButtonModule,
    CommonModule,
    FormsModule,
    RouterModule
],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css'
})
export class UserHeaderComponent {
  constructor(private _auth:AuthService, private router:Router){}

  isMobile = isMobile();
  opVisible = false;
  options = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      router: './home',
      classRouter: '/user/home'
    },
    {
      label: 'Agenda',
      icon: 'pi pi-calendar',
      router: './agenda',
      classRouter: '/user/agenda'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      router: './clientes',
      classRouter: '/user/clientes'
    },
    {
      label: 'Serviços',
      icon: 'pi pi-briefcase',
      router: './servicos',
      classRouter: '/user/servicos'
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-objects-column',
      router: './dashboard',
      classRouter: '/user/dashboard'
    }
  ];

  iAmHere = (opRouter:string) => {
    return opRouter == this.router.url
  }

  logout(){
    this._auth.Logout();
  }
}
