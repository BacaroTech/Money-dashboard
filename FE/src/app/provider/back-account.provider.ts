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

  getBankAccountByUser(uuid: string): Observable<BankAccount[]> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': uuid
    });

    return this.http.get<BankAccount[]>(
      this.readEnvFile.getKrakend() + '/bank-account',
      { headers: headers }
    );
  }

  massiveUpdateBankAccountByUser(uuid_user: string, bank_accounts: BankAccount[]): Observable<BankAccount[]>{
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': uuid_user
    });

    return this.http.put<BankAccount[]>(
      this.readEnvFile.getKrakend() + '/bank-account/'+uuid_user,
      bank_accounts,
      { headers: headers }
    );
  }

  deleteBankAccount(uuid_user: string, uuid_bankAccount: string): Observable<string>{
    const headers = new HttpHeaders({
      responseType: 'text',
      'uuid': uuid_user
    });

    return this.http.delete<string>(
      this.readEnvFile.getKrakend() + '/bank-account/'+uuid_bankAccount,
      { headers: headers }
    );
  }
}
