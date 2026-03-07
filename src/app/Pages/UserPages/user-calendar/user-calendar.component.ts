import { Component } from '@angular/core';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { AvatarModule } from "primeng/avatar";
import { Ripple } from "primeng/ripple";
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [
    CalendarModule,
    AvatarModule,
    Ripple,
],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css'
})
export class UserCalendarComponent {
  locale = ptBR;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Event',
      start: new Date(),
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }

    }
  ];
}
