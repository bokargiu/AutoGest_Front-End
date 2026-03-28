import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UserDashboardComponent } from './user-dashboard.component';
import { OrderService } from 'src/app/Services/OrderService/order.service';
import { ClientService } from 'src/app/Services/ClientService/client.service';
import { ServiceService } from 'src/app/Services/ServiceService/service.service';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardComponent],
      providers: [
        { provide: OrderService, useValue: { getAll: () => of([]) } },
        { provide: ClientService, useValue: { getAll: () => of([]) } },
        { provide: ServiceService, useValue: { getAll: () => of([]) } },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
