import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

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
    this.creatItens();

    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.creatItens());
  }
  private creatItens(){
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
    ];
  }

  private isRoute(router:string){
    return router === this._router.url ?
      'secondary-btn'
      :
      'primary-btn';
  }
  
}
