import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { Error404Component } from './pages/error404/error404.component';
import { ToDarkComponent } from './components/to-dark/to-dark.component';
import { HomeComponent } from './pages/home/home.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { FormFlowComponent } from './pages/form-flow/form-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashReviewComponent } from './pages/cash-review/cash-review.component';
import { ModalComponent } from './components/modal/modal.component';
import { EndMonthComponent } from './pages/end-month/end-month.component';
import { AlertComponent } from './components/alert/alert.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { TableComponent } from './components/table/table.component';
import { SingleDocumentComponent } from './pages/single-document/single-document.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ModifyEndMonthComponent } from './pages/modify-end-month/modify-end-month.component';
import { ModifyFlowComponent } from './pages/modify-flow/modify-flow.component';
import { LoginComponent } from './pages/login/login.component';
import { APP_INITIALIZER } from '@angular/core';
import { ReadSettingService } from './services/read-setting.service';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorMessageLabelComponent } from './components/error-message-label/error-message-label.component';

export function initApp(readSetting: ReadSettingService) {
  return () => readSetting.loadConfig();
}

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
    ModifyEndMonthComponent,
    ModifyFlowComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageLabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ReadSettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ReadSettingService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
