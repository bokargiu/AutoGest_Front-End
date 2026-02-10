import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "src/app/Components/UserPageComponents/side-menu/side-menu.component";
import { UserHeaderComponent } from "src/app/Components/UserPageComponents/user-header/user-header.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet,
    SideMenuComponent,
    UserHeaderComponent
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
