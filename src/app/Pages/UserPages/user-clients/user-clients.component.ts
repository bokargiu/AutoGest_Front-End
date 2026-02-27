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
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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
  constructor(private clientS:ClientService) {}

  @ViewChild('tb') table!: Table;

  clients:Client[] = [];

  selectedClient:Client | any = null;

  newClientV: boolean = false;


  editClientV: boolean = false;
  clientDTO:Client = {
    'id': '',
    'name': '',
    'number': '',
    'rating': 0
  }

  dellClientV: boolean = false;

  ngOnInit(): void {
    this.getClients();
  }
  btnNew(){
    this.newClientV = !this.newClientV;
    this.clientDTO = {
    'id': '',
    'name': '',
    'number': '',
    'rating': 0
  }
  }
  creatNew(){
    this.clientS.postClient(this.clientDTO).subscribe({
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
      this.clientDTO =  { ...this.selectedClient }
    }
  }
  alterar(){
    this.clientS.patchClient(this.clientDTO).subscribe({
      next: () => {
        console.log("Cliente Atualizado com Sucesso!");
        this.refreshTable();
      },
      error: (err) => {
        console.error(err)
      }
    })
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
  getClients(){
    this.clientS.getAll().subscribe({
      next: (cs) => {
          this.clients = cs;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  refreshTable(){
    this.getClients();
    this.clientDTO = {
    'id': '',
    'name': '',
    'number': '',
    'rating': 0
  }
    this.newClientV = false;
    this.editClientV = false;
    this.dellClientV = false;
    this.table.reset();
    this.selectedClient = null;
  }
}
