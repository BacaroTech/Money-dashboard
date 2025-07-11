import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { APP_INITIALIZER } from '@angular/core';
import { ReadSettingService } from './services/read-setting.service';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorMessageLabelComponent } from './components/error-message-label/error-message-label.component';
import { ProfileComponent } from './pages/profile/profile.component';

export function initApp(readSetting: ReadSettingService) {
  return () => readSetting.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    Error404Component,
    HomeComponent,
    ModalComponent,
    TableComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageLabelComponent,
    ProfileComponent
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
