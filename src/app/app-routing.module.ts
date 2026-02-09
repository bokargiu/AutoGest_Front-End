import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './Pages/home-component/home-component.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { HomeComponent } from './Pages/UserPages/home/home.component';
import { authGuardGuard } from './Guards/auth-guard.guard';
import { UserComponent } from './Pages/UserPages/user/user.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponentComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"user", component:UserComponent, canActivateChild:[authGuardGuard], children: [
    {path:"", redirectTo:"home", pathMatch:"full"},
    {path:"home", component:HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
