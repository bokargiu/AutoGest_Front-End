import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { Order } from 'src/app/Interfaces/Order';
import { OrderService } from 'src/app/Services/OrderService/order.service';
import { ClientService } from 'src/app/Services/ClientService/client.service';
import { ServiceService } from 'src/app/Services/ServiceService/service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loading = true;
  error: string | null = null;

  clientCount = 0;
  serviceCount = 0;
  upcomingCount = 0;
  upcomingOrders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private loadDashboard(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      orders: this.orderService.getAll(),
      clients: this.clientService.getAll(),
      services: this.serviceService.getAll(),
    }).subscribe({
      next: ({ orders, clients, services }) => {
        this.clientCount = clients.length;
        this.serviceCount = services.length;

        const start = this.startOfToday().getTime();
        const future = orders.filter((o) => new Date(o.start).getTime() >= start);
        this.upcomingCount = future.length;
        this.upcomingOrders = [...future]
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .slice(0, 8);

        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados. Tente novamente.';
        this.loading = false;
      },
    });
  }

  formatDateTime(value: Date | string): string {
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}