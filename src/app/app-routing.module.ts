import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from './Pages/home-component/home-component.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home", component:HomeComponentComponent},
  {path:"login", component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
