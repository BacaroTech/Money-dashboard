import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReadSettingService } from './app/services/read-setting.service';
import { APP_INITIALIZER } from '@angular/core';
import { appRoutes } from './app/app-routing.module';

export function initApp(readSetting: ReadSettingService) {
  return () => readSetting.loadConfig();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    ReadSettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ReadSettingService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
