import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { Observable } from 'rxjs';
import { Register } from '../model/register';
import { Login } from '../model/login';
import { User } from '../model/user';
import { UserLogService } from '../services/user-log.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileProviderService {

  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

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

  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<User>(
      this.readEnvFile.getKrakend() + '/users',
      { headers: headers }
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<User>(
      this.readEnvFile.getKrakend() + '/users',
      user,
      { headers: headers }
    );
  }

  deleteUser(): Observable<string> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.delete(
      this.readEnvFile.getKrakend() + '/users',
      {
        headers: headers,
        responseType: 'text' as 'text'
      }
    );
  }
}
