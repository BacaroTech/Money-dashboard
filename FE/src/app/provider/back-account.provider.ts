import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { BankAccount } from '../model/bankAccount';
import { Observable } from 'rxjs';
import { UserLogService } from '../services/user-log.service';

@Injectable({
  providedIn: 'root'
})
export class BackAccountProviderService {
  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

  getBankAccountByUser(): Observable<BankAccount[]> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<BankAccount[]>(
      this.readEnvFile.getKrakend() + '/bank-account',
      { headers: headers }
    );
  }

  massiveUpdateBankAccountByUser(bank_accounts: BankAccount[]): Observable<BankAccount[]> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<BankAccount[]>(
      this.readEnvFile.getKrakend() + '/bank-account/',
      bank_accounts,
      { headers: headers }
    );
  }

  deleteBankAccount(uuid_bankAccount: string): Observable<string> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.delete(
      this.readEnvFile.getKrakend() + '/bank-account/' + uuid_bankAccount,
      {
        headers: headers,
        responseType: 'text' as 'text'  // Questo va nelle opzioni, non negli headers
      }
    );
  }
}
