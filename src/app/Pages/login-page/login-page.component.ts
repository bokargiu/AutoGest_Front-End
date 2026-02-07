import { Component, OnInit } from '@angular/core';
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
import { DividerModule } from "primeng/divider";
import { Router, RouterLink } from "@angular/router";
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { AuthService } from 'src/app/Services/AuthService/auth.service';

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
    Button,
    DividerModule,
    RouterLink
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  user!: string
  password!: string

  constructor(private _user:UserServiceService, private router:Router, private _token:AuthService) {}

  ngOnInit(): void {
      const valid = this._token.TokenValid();
      if(valid){
        this.router.navigate(['/user']);
      }
  }

  Login(){
    this._user.Login(this.user, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.result);
        this.router.navigate(['/user']);
      },
      error: (err) => {
          console.error('Erro no login ', err)
      },
    })
  }
}
