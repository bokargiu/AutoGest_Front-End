import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Button } from "primeng/button";
import { Ripple } from "primeng/ripple";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    Button,
    Ripple
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit(): void {
      this.items = [
        {
          label: 'Principal',
          icon: 'pi pi-home',
          routerLink: '/home'
        },
        {
          label: 'FAQ',
          icon: 'pi pi-question-circle',
          routerLink: '/faq'
        }
      ]
  }
}
