import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { HomeComponent } from './home/home.component';
import {AuthGuardService} from "../app/auth/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: "**",
    redirectTo: "home",
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
