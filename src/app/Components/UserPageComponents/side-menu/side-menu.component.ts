import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  itens: { label:string; icon:string; router:string }[] = [];

  ngOnInit(): void {
      this.itens = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        router: '/home'
      },
      {
        label: 'Agenda',
        icon: 'pi pi-calendar',
        router: '/agenda'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        router: '/clientes'
      },
      {
        label: 'Serviços',
        icon: 'pi pi-briefcase',
        router: '/servicos'
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-objects-column',
        router: '/dashboard'
      }
    ]
  }
  
}
