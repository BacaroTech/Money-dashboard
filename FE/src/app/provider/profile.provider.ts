import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { Observable } from 'rxjs';
import { Register } from '../model/register';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class ProfileProviderService {

  constructor(
    private http: HttpClient,
    private readEnvFile: ReadSettingService
  ) { }

  registerUser(regUser: Register): Observable<string> {
    return this.http.post<string>(this.readEnvFile.getKrakend()+'/users/register', regUser);
  }

  loginUser(loginUser: Login): Observable<string> {
    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=UTF-8');
    return this.http.post<string>(this.readEnvFile.getKrakend()+'/users/login', loginUser);
  }
}
