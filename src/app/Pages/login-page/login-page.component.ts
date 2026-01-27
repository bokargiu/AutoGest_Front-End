import { Component } from '@angular/core';
import { HeaderComponent } from "src/app/Components/header/header.component";
import { FooterComponent } from "src/app/Components/footer/footer.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
