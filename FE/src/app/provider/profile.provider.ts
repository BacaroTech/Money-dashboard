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

  registerUser(regUser: Register): Observable<any> {
    return this.http.post(
      this.readEnvFile.getKrakend() + '/users/register', 
      regUser,
      { responseType: 'text' }
    );
  }

  loginUser(loginUser: Login): Observable<string> {
    return this.http.post(
      this.readEnvFile.getKrakend() + '/users/login',
      loginUser,
      { responseType: 'text' }
    );
  }


}
