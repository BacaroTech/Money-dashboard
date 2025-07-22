import { Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddOperationComponent } from './pages/add-operation/add-operation.component';
import { ReviewComponent } from './pages/review/review.component';
import { loginGuard } from './guard/login.guard';

export const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [loginGuard]},
  { path: "register", component: RegisterComponent, canActivate: [loginGuard] },
  { path: "profile", component: ProfileComponent },
  { path: "dashboard", component: HomeComponent },
  { path: "addOperation", component: AddOperationComponent },
  { path: "review", component: ReviewComponent },
  { path: "404", component: Error404Component },
  { path: "**", redirectTo: "404" }
];
