import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { BankAccount } from '../model/bankAccount';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackAccountProviderService {
  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);

  constructor() { }

  getBanckAccountByUser(uuid: string): Observable<BankAccount[]> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': uuid
    });

    return this.http.get<BankAccount[]>(
      this.readEnvFile.getKrakend() + '/bank-account',
      { headers: headers }
    );
  }
}
