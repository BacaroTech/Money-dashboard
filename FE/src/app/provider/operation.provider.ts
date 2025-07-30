import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadSettingService } from '../services/read-setting.service';
import { UserLogService } from '../services/user-log.service';
import { BankAccount } from '../model/bankAccount';
import { Operation } from '../model/operation';
import { BackendResponce } from '../model/responce';
import { MultipleOperations } from '../model/multipleOperations';


@Injectable({
  providedIn: 'root'
})
export class OperationProviderService {

  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

  insertOperationByUser(bankAccountUuid: string, newOperation: Operation): Observable<BackendResponce<string>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.post<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/operations/bank-account/' + bankAccountUuid, 
      newOperation, 
      {headers: headers}

    );
  }

  getOperationByUserPaginated(bankAccountUuid: string, pageNumber: number, pageSize: number): Observable<BackendResponce<MultipleOperations>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<BackendResponce<MultipleOperations>>(
      this.readEnvFile.getKrakend() + '/operations/bank-account/' + bankAccountUuid + 
      '?pageNumber='+ pageNumber +
      '&pageSize=' + pageSize,
      {headers: headers}
    );
  }

  getSingleOperation(operationUuid: string, bankAccountUuid: string): Observable<BackendResponce<Operation>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<BackendResponce<Operation>>(
      this.readEnvFile.getKrakend() + '/operations/' + operationUuid + '/bank-account/' + bankAccountUuid,
      {headers: headers}
    );
  }

  updateSingleOperation(operationUuid: string, bankAccountUuid: string, operation: Operation): Observable<BackendResponce<Operation>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<BackendResponce<Operation>>(
      this.readEnvFile.getKrakend() + '/operations/' + operationUuid + '/bank-account/' + bankAccountUuid,
      operation,
      {headers: headers}
    );
  }

  deleteSingleOperation(operationUuid: string, bankAccountUuid: string): Observable<BackendResponce<string>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.delete<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/operations/' + operationUuid + '/bank-account/' + bankAccountUuid,
      {headers: headers}
    );
  }
}
