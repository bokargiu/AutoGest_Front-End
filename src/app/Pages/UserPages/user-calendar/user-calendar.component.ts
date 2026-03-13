// user-calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

// PrimeNG Calendar
import * as primengCalendar from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';

import { OrderDto, Order } from 'src/app/Interfaces/Order';
import { OrderService } from 'src/app/Services/OrderService/order.service';
import { Client } from 'src/app/Interfaces/client';
import { ClientService } from 'src/app/Services/ClientService/client.service';
import { ServiceMin } from 'src/app/Interfaces/service';
import { ServiceService } from 'src/app/Services/ServiceService/service.service';
import { isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [
    AngularCalendarModule,
    AvatarModule,
    Ripple,
    DialogModule,
    FormsModule,
    primengCalendar.CalendarModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
  ],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css'
})
export class UserCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  selecetedOrder: Order | null = null;

  // Dialog
  scheduleV: boolean = false;
  editScheduleV: boolean = false;
  delleteScheduleV: boolean = false;

  selectedServices: string[] = []

  scheduleDTO: OrderDto = {
    start: new Date(),
    clientId: '',
    servicesIds: []
  };
  startEdit: Date = new Date();

  schedule: Order = {} as Order;

  // Dados carregados da API
  clients: Client[] = [];
  services: ServiceMin[] = [];

  // Orders e eventos no calendário
  orders: Order[] = [];
  events: CalendarEvent[] = [];

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadClients();
    this.loadServices();
    this.loadOrders();
  }

  // ---------- Dialog Novo Agendamento ----------

  newScheduleDialog(): void {
    this.resetScheduleDto();
    this.scheduleV = !this.scheduleV;
    console.log(this.services)
  }

  private resetScheduleDto(): void {
    this.scheduleDTO = {
      start: new Date(),
      clientId: '',
      servicesIds: []
    };
  }

  createSchedule(): void {
    if (!this.scheduleDTO.clientId || !this.scheduleDTO.start) {
      console.error('Cliente e data/hora são obrigatórios.');
      return;
    }

    this.orderService.post(this.scheduleDTO).subscribe({
      next: () => {
        console.log('Agendamento criado com sucesso!');
        this.newScheduleDialog();
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ---------- Carregamento de dados ----------

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => this.clients = clients,
      error: (err) => console.error(err)
    });
  }

  
  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (s) => { this.services = s; },
      error: (err) => console.error(err)
    });
  }
  

  loadOrders(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.events = this.mapOrdersToEvents(orders);
      },
      error: (err) => console.error(err)
    });
  }

  // ---------- Conversão Order -> CalendarEvent ----------

  private mapOrdersToEvents(orders: Order[]): CalendarEvent[] {
    return orders.map(order => ({
      start: new Date(order.start),
      end: new Date(order.end),
      title: `${order.client.name} - 
              ${new Date(order.start).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} a 
              ${new Date(order.end).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - 
              R$${order.totalPrice}`,
      color: {
        primary: '#873adf',
        secondary: '#D1E8FF'
      },
      meta: {
        orderId: order.id
      }
    }));
  }

  // ---------- Dialog Editar ----------

  openEditSchedule(): void {
    if(this.selecetedOrder){
      this.editScheduleV = true;
      this.schedule = this.selecetedOrder;
      this.startEdit = new Date(this.schedule.start);
      this.selectedServices = this.schedule.services.map(s => s.id);
    }
  }

  closeEditSchedule(): void {
    this.editScheduleV = false;
    this.selecetedOrder = null;
    this.startEdit = new Date();
    this.selectedServices = [];
  }

  updateSchedule(): void {

  }


  // ---------- Dialog Deletar ----------

  openDeleteSchedule(): void {
    console.log('Excluir agendamento - implementar');
  }

  // -------------- Biblioteca Angular-Calendar --------------------

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked({ event }: { event: CalendarEvent }):void{
    const orderId = event.meta.orderId;
    const order = this.orders.find(o => o.id === orderId);
    if(order){
      this.selecetedOrder = order;
    } else {
      console.warn('Nenhuma order encontrada para o evento clicado.');
    }
  }
}