import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadSettingService } from '../services/read-setting.service';
import { CashFlow } from '../model/cashFlow';


@Injectable({
  providedIn: 'root'
})
export class FlowProviderService {

  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);

  constructor() { }

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
