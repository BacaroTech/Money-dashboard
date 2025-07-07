import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CashFlow } from '../model/cashFlow';
import { Observable } from 'rxjs';
import { ReadSettingService } from '../services/read-setting.service';


@Injectable({
  providedIn: 'root'
})
export class FlowProviderService {

  constructor(
    private http: HttpClient,
    private readEnvFile: ReadSettingService
  ) { }

  getAllFlow(): Observable<CashFlow[]> {
    return this.http.get<CashFlow[]>(this.readEnvFile.getKrakend()+'/flow/getAll');
  }

  getFlowById(body: any): Observable<CashFlow[]> {
    return this.http.post<CashFlow[]>(this.readEnvFile.getKrakend()+'/flow/byID', body);
  }

  insertFlow(body: CashFlow[]): Observable<CashFlow[]> {
    return this.http.post<CashFlow[]>(this.readEnvFile.getKrakend()+'/flow/insertFlow', body);
  }

  updateFlow(body: CashFlow[]): Observable<CashFlow[]> {
    return this.http.post<CashFlow[]>(this.readEnvFile.getKrakend()+'/flow/updateFlow', body);
  }

  postForMonth(date: string): Observable<CashFlow[]> {
    return this.http.post<CashFlow[]>(this.readEnvFile.getKrakend()+'/flow/forMonth', {"date":date});
  }

  deleteFlow(body: any): Observable<any> {
    return this.http.post<any>(this.readEnvFile.getKrakend()+'/flow/deleteID', body);
  }
}
