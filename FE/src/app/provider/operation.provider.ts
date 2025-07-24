import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadSettingService } from '../services/read-setting.service';
import { UserLogService } from '../services/user-log.service';
import { BankAccount } from '../model/bankAccount';
import { Operation } from '../model/operation';


@Injectable({
  providedIn: 'root'
})
export class OperationProviderService {

  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

  insertOperationByUser(uuidBankAccount: string, newOperation: Operation): Observable<string> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.post(
      this.readEnvFile.getKrakend() + '/operations/bank-account/' + uuidBankAccount, 
      newOperation, 
      {
        headers,
        responseType: 'text'
      }
    );
  }


  getOperationByUser(uuidBankAccount: string): Observable<string> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<string>(
      this.readEnvFile.getKrakend() + '/operations/bank-account/' + uuidBankAccount,
      {
        headers: headers,
      }
    );
  }
}
