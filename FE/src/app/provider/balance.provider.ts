import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documents } from '../model/document';
import { Observable } from 'rxjs';
import DocumentsBetween from '../model/documentsBetween';
import { ReadSettingService } from '../services/read-setting.service';


@Injectable({
  providedIn: 'root'
})
export class BalanceProviderService {

  constructor(
    private http: HttpClient,
    private readEnvFile: ReadSettingService
  ) { }

  getAllDocument(): Observable<Documents[]> {
    return this.http.get<Documents[]>(this.readEnvFile.getKrakend()+'/balance/getAll');
  }

  getDocumentById(body: any): Observable<DocumentsBetween[]> {
    return this.http.post<DocumentsBetween[]>(this.readEnvFile.getKrakend()+'/balance/byID', body);
  }

  getAllDocumentByMonth(body: any): Observable<{"id": number}> {
    return this.http.post<{"id": number}>(this.readEnvFile.getKrakend()+'/balance/byMonth', body);
  }

  insertDocument(body: any): Observable<Documents[]> {
    return this.http.post<Documents[]>(this.readEnvFile.getKrakend()+'/balance/insertDocument', body);
  }

  updateDocument(body: any): Observable<Documents[]> {
    return this.http.put<Documents[]>(this.readEnvFile.getKrakend()+'/balance/updateID', body);
  }

  deleteDocument(body: any): Observable<any> {
    return this.http.post<any>(this.readEnvFile.getKrakend()+'/balance/deleteID', body);
  }
}
