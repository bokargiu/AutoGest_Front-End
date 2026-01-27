import { Component, OnInit } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { HeaderComponent } from "src/app/Components/header/header.component";
import { FooterComponent } from "src/app/Components/footer/footer.component";
import { CardModule } from "primeng/card";
import { ImageModule } from 'primeng/image';
import { Ripple } from "primeng/ripple";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    CardModule,
    ImageModule,
    Ripple
],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {
  cardsFunctions: { img: string; title: string; txt: string }[] = []
  ngOnInit(): void {
      this.cardsFunctions = [
        {
          img: 'assets/Images/AutoGest homePage.png',
          title: 'Cadastre seus serviços',
          txt: 'Com a função de cadastrar serviços você pode atribuir a duração do serviço e o valor a ser pago para tal.'
        },
        {
          img: 'assets/Images/AutoGest homePage.png',
          title: 'Adicione a sua lista de clientes',
          txt: 'Adicione seus clintes assim podera criar seus hórarios.'
        },
        {
          img: 'assets/Images/AutoGest homePage.png',
          title: 'Crie seu calendário e receba seus hórarios diariamente',
          txt: 'Receba diariamente sua agenda via mensagens, caso houver alteração na agenda do dia você será informado.'
        },
      ]
  }
}
