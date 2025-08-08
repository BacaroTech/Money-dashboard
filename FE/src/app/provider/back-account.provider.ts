import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { BankAccount } from '../model/bankAccount';
import { Observable } from 'rxjs';
import { UserLogService } from '../services/user-log.service';
import { BackendResponce } from '../model/responce';

@Injectable({
  providedIn: 'root'
})
export class BackAccountProviderService {
  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

  getBankAccountsByUser(): Observable<BackendResponce<BankAccount[]>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<BackendResponce<BankAccount[]>>(
      this.readEnvFile.getKrakend() + '/bank-accounts',
      { headers: headers }
    );
  }

  createBankAccountByUser(bank_account: BankAccount): Observable<BackendResponce<string>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.post<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/bank-accounts',
      bank_account,
      { headers: headers }
    );
  }

  massiveUpdateBankAccountByUser(bank_accounts: BankAccount[]): Observable<BackendResponce<BankAccount[]>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<BackendResponce<BankAccount[]>>(
      this.readEnvFile.getKrakend() + '/bank-accounts/many',
      bank_accounts,
      { headers: headers }
    );
  }

  singleUpdateBankAccountByUser(bank_account: BankAccount, bankAccountUuid: string): Observable<BackendResponce<BankAccount>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<BackendResponce<BankAccount>>(
      this.readEnvFile.getKrakend() + '/bank-accounts/' + bankAccountUuid,
      bank_account,
      { headers: headers }
    );
  }

  deleteBankAccount(bankAccountUuid: string): Observable<BackendResponce<string>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.delete<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/bank-accounts/' + bankAccountUuid,
      {
        headers: headers
      }
    );
  }
}
