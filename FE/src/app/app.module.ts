import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReadSettingService } from './services/read-setting.service';
import { AppComponent } from './app.component';

export function initApp(readSetting: ReadSettingService) {
  return () => readSetting.loadConfig();
}

@NgModule({
  providers: [
    ReadSettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ReadSettingService],
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
  static bootstrap = () =>
    bootstrapApplication(AppComponent, {
      providers: [
        ReadSettingService,
        {
          provide: APP_INITIALIZER,
          useFactory: initApp,
          deps: [ReadSettingService],
          multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
}
