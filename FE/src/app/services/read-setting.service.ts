import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReadSettingService {
  private krakend!: string;

  constructor(
    private http: HttpClient
  ) { }

  async loadConfig(){
    console.group("LETTURA FILE CONFIGURAZIONE");
    //to change for relese
    this.http.get('/assets/setting/local.json')
      .subscribe({
        next: (config: any) => {
          console.log("Configurazioni:");
          console.table(config);

          //set variables
          this.krakend = config.krakend;
          
          console.groupEnd();
        },
        error: (err: any) => {
          console.error("Errore durante la lettura del file di configurazione: ", err);
          console.groupEnd();
        }
      });
  }

  public getKrakend() {
    return this.krakend;
  }
}
