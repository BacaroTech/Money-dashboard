import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReadSettingService {
  private krakend!: string;

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  async loadConfig() {
    console.group("LETTURA FILE CONFIGURAZIONE");
    try {
      const config: any = await firstValueFrom(
        this.http.get('/assets/setting/local.json')
      );
      console.log("Configurazioni:");
      console.table(config);
      this.krakend = config.krakend;
    } catch (err) {
      console.error("Errore durante la lettura del file di configurazione: ", err);
    }
    console.groupEnd();
  }

  public getKrakend() {
    return this.krakend;
  }
}
