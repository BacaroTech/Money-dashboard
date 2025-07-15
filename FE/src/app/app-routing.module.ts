import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddOperationComponent } from './pages/add-operation/add-operation.component';
import { ReviewComponent } from './pages/review/review.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},

  //user
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent},
  
  //all
  {path: "dashboard", component: HomeComponent},
  {path: "addOperation", component: AddOperationComponent},
  {path: "review", component: ReviewComponent},

  //errors
  {path: "404", component: Error404Component},
  {path: "**", redirectTo: "404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
