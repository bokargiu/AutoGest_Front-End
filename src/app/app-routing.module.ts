import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './Pages/home-component/home-component.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { HomeComponent } from './Pages/UserPages/home/home.component';
import { authGuardGuard } from './Guards/auth-guard.guard';
import { UserComponent } from './Pages/UserPages/user/user.component';
import { UserCalendarComponent } from './Pages/UserPages/user-calendar/user-calendar.component';
import { UserServicesComponent } from './Pages/UserPages/user-services/user-services.component';
import { UserClientsComponent } from './Pages/UserPages/user-clients/user-clients.component';
import { UserDashboardComponent } from './Pages/UserPages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponentComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"user", component:UserComponent, canActivateChild:[authGuardGuard], children: [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home", component:HomeComponent},
    {path:"agenda", component:UserCalendarComponent},
    {path:"servicos", component:UserServicesComponent},
    {path:"clientes", component:UserClientsComponent},
    {path:"dashboard", component:UserDashboardComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
