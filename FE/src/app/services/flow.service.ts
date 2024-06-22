import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CashFlow } from '../model/cashFlow';
import url from './setting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private http: HttpClient) { }

  getAllFlow(): Observable<CashFlow[]> {
    return this.http.get<CashFlow[]>(url+'/flow/getAll');
  }
}
