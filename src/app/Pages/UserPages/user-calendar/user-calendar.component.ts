// user-calendar.component.ts
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CalendarWeekViewBeforeRenderEvent, CalendarEvent, CalendarModule as AngularCalendarModule, CalendarWeekViewAllDayEvent } from 'angular-calendar';
import { AvatarModule } from 'primeng/avatar';
import { Ripple } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

// PrimeNG Calendar
import * as primengCalendar from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    OverlayPanelModule
  ],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css',
  styles: [`
    .cal-day-column.cal-other-month{
      background-color: rgba(0, 0, 0, 0.066);;
      pointer-events: none;
    }
    `]
})
export class UserCalendarComponent implements OnInit {

  getFormatedTitle(){
    let str:string = this.viewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric'}) 
    return str.charAt(0).toLocaleUpperCase() + str.slice(1)
  }

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  selecetedOrder!: Order;

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

  clients: Client[] = [];
  services: ServiceMin[] = [];

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

  // ---------- Dialog Novo ----------

  newScheduleDialog(): void {
    this.resetScheduleDto();
    this.scheduleV = !this.scheduleV;
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
      return;
    }
    this.scheduleDTO.servicesIds = this.selectedServices;
    this.orderService.post(this.scheduleDTO).subscribe({
      next: () => {
        this.newScheduleDialog();
        this.selectedServices = [];
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

  // ---------- CalendarEvent ----------

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
    this.selecetedOrder = null as any;
    this.startEdit = new Date(this.selecetedOrder.start);
    this.selectedServices = [];
  }

  updateSchedule(): void {
    this.orderService.patch(this.schedule.id, {
      start: this.startEdit,
      clientId: this.selecetedOrder.client.id,
      servicesIds: this.selectedServices
    }).subscribe({
      next: () => {
      this.loadOrders();
      },
      error: (err) => console.error(err)
    });
    this.closeEditSchedule();
  }


  // ---------- Dialog Deletar ----------

  openDeleteSchedule(): void {
    if(!this.selecetedOrder) return;
    this.delleteScheduleV = true;
    this.schedule = this.selecetedOrder;
    this.startEdit = new Date(this.schedule.start);
    this.selectedServices = this.schedule.services.map(s => s.id);

  }
  closeDeleteSchedule(): void {
    this.delleteScheduleV = false;
    this.selecetedOrder = null as any;
    this.startEdit = new Date();
    this.selectedServices = [];
  }
  deleteSchedule(): void {
    this.orderService.delete(this.schedule.id).subscribe({
      next: () => {
        this.delleteScheduleV = false;
        this.loadOrders();
      },
      error: (err) => console.error(err)
    });
  }

  // -------------- Biblioteca Angular-Calendar --------------------

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.viewDate = date;
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