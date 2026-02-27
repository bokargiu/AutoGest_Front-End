import { Component } from '@angular/core';
import { FooterComponent } from "src/app/Components/footer/footer.component";
import { Button } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { FloatLabelModule } from "primeng/floatlabel";
import { HeaderComponent } from "src/app/Components/header/header.component";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from "primeng/inputtext";
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

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
  constructor(private userService:UserServiceService, private router:Router){}
  register(){
    this.userService.SingUpAndLogin(this.username, this.email, this.password).subscribe({
      next: (response) => {
        console.log("Registro feito com sucesso!");
        localStorage.setItem('token', response.result);
        this.router.navigate(['/user']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
