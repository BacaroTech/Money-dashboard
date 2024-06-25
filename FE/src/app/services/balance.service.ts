import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import url from './setting';
import { Documents } from '../model/document';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  getAllDocument(): Observable<Documents[]> {
    return this.http.get<Documents[]>(url+'/balance/getAll');
  }

  insertDocument(body: Documents[]): Observable<Documents[]> {
    return this.http.post<Documents[]>(url+'/balance/insertDocument', body);
  }
}
