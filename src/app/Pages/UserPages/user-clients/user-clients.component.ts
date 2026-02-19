import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from "primeng/avatar";
import { Ripple } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';


interface Client {
  id:string
  name:string
  number:string
  rating:number
}

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
    FormsModule,
    DialogModule,
],
  templateUrl: './user-clients.component.html',
  styleUrl: './user-clients.component.css'
})
export class UserClientsComponent implements OnInit{
  clientsTeste:Client[] = [
    {id:"1", name: 'oi', number: 'oi', rating: 3},
    {id:"2", name: 'tachau', number: 'oi', rating: 4},
    {id:"3", name: 'obrigado', number: 'oi', rating: 3.5},
    {id:"4", name: 'feliz', number: 'oi', rating: 5},
    {id:"5", name: 'natal', number: 'oi', rating: 2},
  ]

  constructor(private http:HttpClient) {}

  @ViewChild('dt') table: any ;

  clients:Client[] = [];

  selectedClient!:Client;

  newClientV: boolean = false;
  newClient!:Client

  editClientV: boolean = false;
  editClient!:Client

  dellClientV: boolean = false;
  dellClient!:Client

  ngOnInit(): void {
    this.http.get<Client[]>('http://localhost:5169/api/Client').subscribe({
      next: (res) => {
        this.clients = res
        console.log(this.clients)
      },
      error: (err) => {
          console.error(err)
      },
    });
    
  }
  btnNew(){
    this.newClientV = !this.newClientV;
  }
  btnEdit(){
    this.editClientV = !this.editClientV;
    this.editClient = this.selectedClient;
  }
  btnDell(){
    this.dellClientV = !this.dellClientV;
    this.dellClient = this.selectedClient;
  }
  cleamTable(){
    this.table.reset();
  }

}
