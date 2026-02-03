import { Component } from '@angular/core';
import { HeaderComponent } from "src/app/Components/header/header.component";
import { FooterComponent } from "src/app/Components/footer/footer.component";
import { CardModule } from "primeng/card";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { Button } from "primeng/button";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    Button
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  user: string | undefined
  password: string | undefined
}
