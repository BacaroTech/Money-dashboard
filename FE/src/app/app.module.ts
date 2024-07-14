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
import { FormFlowComponent } from './components/form-flow/form-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashReviewComponent } from './components/cash-review/cash-review.component';
import { ModalComponent } from './components/modal/modal.component';
import { EndMonthComponent } from './components/end-month/end-month.component';
import { AlertComponent } from './components/alert/alert.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { TableComponent } from './components/table/table.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ModifyEndMonthComponent } from './components/modify-end-month/modify-end-month.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    Error404Component,
    ToDarkComponent,
    HomeComponent,
    CashFlowComponent,
    FormFlowComponent,
    CashReviewComponent,
    ModalComponent,
    EndMonthComponent,
    AlertComponent,
    DocumentsComponent,
    TableComponent,
    SingleDocumentComponent,
    ModifyEndMonthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
