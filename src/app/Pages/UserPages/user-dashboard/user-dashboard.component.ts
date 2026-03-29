import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';

import { Order } from 'src/app/Interfaces/Order';
import { OrderService } from 'src/app/Services/OrderService/order.service';
import { ClientService } from 'src/app/Services/ClientService/client.service';
import { ServiceService } from 'src/app/Services/ServiceService/service.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule,
    ProgressSpinnerModule,
    DividerModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  loading = true;
  error: string | null = null;

  clientCount = 0;
  serviceCount = 0;
  orderCount = 0;
  upcomingCount = 0;

  revenuePast30Days = 0;
  avgTicketLast30Days = 0;
  ordersCountPast30Days = 0;
  revenueScheduledNext30Days = 0;
  revenueScheduledNext7Days = 0;
  avgOrdersPerWeekLast4Weeks = 0;

  upcomingOrders: Order[] = [];

  private readonly msDay = 24 * 60 * 60 * 1000;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  retry(): void {
    this.load();
  }

  private load(): void {
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
        this.orderCount = orders.length;

        const now = Date.now();
        const startToday = new Date();
        startToday.setHours(0, 0, 0, 0);
        const todayStart = startToday.getTime();

        const future = orders.filter((o) => new Date(o.start).getTime() >= todayStart);
        this.upcomingCount = future.length;

        const t30Past = now - 30 * this.msDay;
        const ordersPast30 = orders.filter((o) => {
          const t = new Date(o.start).getTime();
          return t >= t30Past && t <= now;
        });
        this.ordersCountPast30Days = ordersPast30.length;
        this.revenuePast30Days = ordersPast30.reduce((s, o) => s + (o.totalPrice ?? 0), 0);
        this.avgTicketLast30Days =
          ordersPast30.length > 0 ? this.revenuePast30Days / ordersPast30.length : 0;

        const t30Future = now + 30 * this.msDay;
        this.revenueScheduledNext30Days = orders
          .filter((o) => {
            const t = new Date(o.start).getTime();
            return t > now && t <= t30Future;
          })
          .reduce((s, o) => s + (o.totalPrice ?? 0), 0);

        const t7Future = now + 7 * this.msDay;
        this.revenueScheduledNext7Days = orders
          .filter((o) => {
            const t = new Date(o.start).getTime();
            return t > now && t <= t7Future;
          })
          .reduce((s, o) => s + (o.totalPrice ?? 0), 0);

        const t28 = now - 28 * this.msDay;
        const ordersLast28 = orders.filter((o) => new Date(o.start).getTime() >= t28);
        this.avgOrdersPerWeekLast4Weeks = ordersLast28.length / 4;

        this.upcomingOrders = [...future]
          .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
          .slice(0, 12);

        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os dados. Tente novamente.';
        this.loading = false;
      },
    });
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
