import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider'
import { Button } from "primeng/button";
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    Button,
],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
