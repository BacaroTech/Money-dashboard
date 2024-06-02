import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { Error404Component } from './components/error404/error404.component';
import { ToDarkComponent } from './components/to-dark/to-dark.component';
import { HomeComponent } from './components/home/home.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { AddFlowComponent } from './components/add-flow/add-flow.component';
import { FormFlowComponent } from './components/form-flow/form-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashReviewComponent } from './components/cash-review/cash-review.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    Error404Component,
    ToDarkComponent,
    HomeComponent,
    CashFlowComponent,
    AddFlowComponent,
    FormFlowComponent,
    CashReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
