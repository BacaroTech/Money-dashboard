import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import url from './setting';
import { Documents } from '../model/document';
import { Observable } from 'rxjs';
import DocumentsBetween from '../model/documentsBetween';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  getAllDocument(): Observable<Documents[]> {
    return this.http.get<Documents[]>(url+'/balance/getAll');
  }

  getDocumentById(body: any): Observable<DocumentsBetween[]> {
    return this.http.post<DocumentsBetween[]>(url+'/balance/byID', body);
  }

  getAllDocumentByMonth(body: any): Observable<{"id": number}> {
    return this.http.post<{"id": number}>(url+'/balance/byMonth', body);
  }

  insertDocument(body: any): Observable<Documents[]> {
    return this.http.post<Documents[]>(url+'/balance/insertDocument', body);
  }
}
