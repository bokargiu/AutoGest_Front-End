import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MenuModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
