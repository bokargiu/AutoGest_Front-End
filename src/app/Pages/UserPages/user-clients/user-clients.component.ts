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
import { Client } from 'src/app/Interfaces/client';
import { ClientService } from 'src/app/Services/ClientService/client.service';
import { InputMaskModule } from 'primeng/inputmask';
import { delay } from 'rxjs';

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
    InputMaskModule
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

  constructor(private clientS:ClientService) {}

  @ViewChild('dt') table: any ;

  clients:Client[] = [];

  selectedClient!:Client

  newClientV: boolean = false;
  name:string = ""
  number:string = ""
  rating:number = 0


  editClientV: boolean = false;
  editClient!:Client

  dellClientV: boolean = false;

  ngOnInit(): void {
    this.refreshTable();
  }
  btnNew(){
    this.newClientV = !this.newClientV;
    this.name ="";
    this.number ="";
    this.rating =0;
  }
  creatNew(){
    this.clientS.postClient(this.name, this.number, this.rating).subscribe({
      next: () => {
        this.refreshTable();
        console.log("Adicionado com sucesso!");
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.btnNew();
  }
  btnEdit(){
    if(this.selectedClient){
      this.editClientV = !this.editClientV;
      this.editClient =  { ...this.selectedClient }
    }
  }
  alterar(){

  }
  btnDell(){
    if(this.selectedClient){
      this.dellClientV = !this.dellClientV;
    }
  }
  dellClient(){
    this.clientS.deleteClient(this.selectedClient.id).subscribe({
      next: () => {
        this.refreshTable();
        console.log("Excluido com sucesso!");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  refreshTable(){
    this.clientS.getAll().subscribe({
      next: (cs) => {
          this.clients = cs;
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.newClientV = false;
    this.editClientV = false;
    this.dellClientV = false;
    this.selectedClient = 
    this.table.reset();
  }

}
