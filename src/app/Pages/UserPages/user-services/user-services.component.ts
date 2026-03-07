import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from "primeng/avatar";
import { Ripple } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Table, TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ServiceDate, ServiceMin } from 'src/app/Interfaces/service';
import { ServiceService } from 'src/app/Services/ServiceService/service.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from "primeng/inputgroup";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { CalendarModule } from "primeng/calendar";

@Component({
  selector: 'app-user-services',
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
    InputNumberModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    CalendarModule
],
  templateUrl: './user-services.component.html',
  styleUrl: './user-services.component.css'
})
export class UserServicesComponent implements OnInit{
  constructor(private serviceS:ServiceService) {}

  @ViewChild('tb') table!: Table;

  services:ServiceMin[] = [];

  selectedService:ServiceMin | any = null;

  newServiceV: boolean = false;

  editServiceV: boolean = false;

  dellServiceV: boolean = false;

  serviceDTO:ServiceDate = {
    'id': '',
    'title': '',
    'duration': new Date(0, 0, 0, 0, 0, 0),
    'price': 0
  }

   getDuration(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return new Date(0, 0, 0, hours, mins, 0);
  }

  ngOnInit(): void {
    this.getServices();
  }
  btnNew(){
    console.log("Clicou no novo serviço");
    this.newServiceV = !this.newServiceV;
    this.serviceDTO = {
    'id': '',
    'title': '',
    'duration': new Date(0, 0, 0, 0, 0, 0),
    'price': 0
  }
  }
  creatNew(){
    this.serviceS.postService(this.serviceDTO).subscribe({
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
    if(this.selectedService){
      this.editServiceV = !this.editServiceV;
      this.serviceDTO =  { ...this.selectedService }
      this.serviceDTO.duration = this.getDuration(this.selectedService.durationMin);
    }
  }
  alterar(){
    this.serviceS.patchService(this.serviceDTO).subscribe({
      next: () => {
        console.log("Serviço Atualizado com Sucesso!");
        this.refreshTable();
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  btnDell(){
    if(this.selectedService){
      this.dellServiceV = !this.dellServiceV;
      this.serviceDTO =  { ...this.selectedService }
      this.serviceDTO.duration = this.getDuration(this.selectedService.durationMin);
    }
  }
  dellService(){
    this.serviceS.deleteService(this.selectedService.id).subscribe({
      next: () => {
        this.refreshTable();
        console.log("Excluido com sucesso!");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getServices(){
    this.serviceS.getAll().subscribe({
      next: (ss) => {
          this.services = ss;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  refreshTable(){
    this.getServices();
    this.serviceDTO = {
    'id': '',
    'title': '',
    'duration': new Date(0, 0, 0, 0, 0, 0),
    'price': 0
  }
    this.newServiceV = false;
    this.editServiceV = false;
    this.dellServiceV = false;
    this.table.reset();
    this.selectedService = null;
  }
}
