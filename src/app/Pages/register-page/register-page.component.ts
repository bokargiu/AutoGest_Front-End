import { Component } from '@angular/core';
import { FooterComponent } from "src/app/Components/footer/footer.component";
import { Button } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { FloatLabelModule } from "primeng/floatlabel";
import { HeaderComponent } from "src/app/Components/header/header.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FooterComponent,
    Button,
    PasswordModule,
    FloatLabelModule,
    HeaderComponent,
    FormsModule,
    RouterLink,
    InputTextModule,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  username!: string
  email!: string
  password!: string

  register(){

  }
}
