import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from "primeng/calendar";
import { CommonModule, Time } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuModule,
    CalendarModule,
    CommonModule,
    FormsModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
