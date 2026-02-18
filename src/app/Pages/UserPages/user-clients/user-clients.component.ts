import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from "primeng/avatar";
import { Ripple } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-clients',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    Ripple,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    TableModule,
    RatingModule,
    FormsModule
],
  templateUrl: './user-clients.component.html',
  styleUrl: './user-clients.component.css'
})
export class UserClientsComponent {
  @ViewChild('dt') table:any;
  cleamTable(){
    this.table.reset();
  }

  clients:{name:string, cell:string, rating:number}[] = [
    {name: 'oi', cell: 'oi', rating: 3},
    {name: 'tachau', cell: 'oi', rating: 4},
    {name: 'obrigado', cell: 'oi', rating: 3.5},
    {name: 'feliz', cell: 'oi', rating: 5},
    {name: 'natal', cell: 'oi', rating: 2},
    {name: 'oi', cell: 'oi', rating: 3},
    {name: 'tachau', cell: 'oi', rating: 4},
    {name: 'obrigado', cell: 'oi', rating: 3.5},
    {name: 'feliz', cell: 'oi', rating: 5},
    {name: 'natal', cell: 'oi', rating: 2},
    {name: 'oi', cell: 'oi', rating: 3},
    {name: 'tachau', cell: 'oi', rating: 4},
    {name: 'obrigado', cell: 'oi', rating: 3.5},
    {name: 'feliz', cell: 'oi', rating: 5},
    {name: 'natal', cell: 'oi', rating: 2},
    {name: 'oi', cell: 'oi', rating: 3},
    {name: 'tachau', cell: 'oi', rating: 4},
    {name: 'obrigado', cell: 'oi', rating: 3.5},
    {name: 'feliz', cell: 'oi', rating: 5},
    {name: 'natal', cell: 'oi', rating: 2},
  ]

}
