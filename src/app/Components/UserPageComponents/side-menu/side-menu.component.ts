import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    RouterModule
],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent implements OnInit {
  itens: { label:string; icon:string; router:string; class:string}[] = [];

  constructor(private _router:Router) {}

  ngOnInit(): void {
      this.itens = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        router: './home',
        class: this.isRoute('/user/home')
      },
      {
        label: 'Agenda',
        icon: 'pi pi-calendar',
        router: './agenda',
        class: this.isRoute('/user/agenda')
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        router: './clientes',
        class: this.isRoute('/user/clientes')
      },
      {
        label: 'Serviços',
        icon: 'pi pi-briefcase',
        router: './servicos',
        class: this.isRoute('/user/servicos')
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-objects-column',
        router: './dashboard',
        class: this.isRoute('/user/dashboard')
      }
    ]
  }

  private isRoute(router:string){
    if(router === this._router.url){
      return 'secondary-btn'
    }
    else{
      return 'primary-btn'
    }
  }
  
}
