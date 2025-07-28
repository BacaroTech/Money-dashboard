import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReadSettingService } from '../services/read-setting.service';
import { Observable } from 'rxjs';
import { Register } from '../model/register';
import { Login } from '../model/login';
import { User } from '../model/user';
import { UserLogService } from '../services/user-log.service';
import { BackendResponce } from '../model/responce';

@Injectable({
  providedIn: 'root'
})
export class ProfileProviderService {

  private http: HttpClient = inject(HttpClient);
  private readEnvFile: ReadSettingService = inject(ReadSettingService);
  private userLog = inject(UserLogService);

  constructor() { }

  registerUser(regUser: Register): Observable<BackendResponce<string>> {
    return this.http.post<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/users/register',
      regUser
    );
  }

  loginUser(loginUser: Login): Observable<BackendResponce<string>> {
    return this.http.post<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/users/login',
      loginUser
    );
  }

  getUser(): Observable<BackendResponce<User>> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.get<BackendResponce<User>>(
      this.readEnvFile.getKrakend() + '/users',
      { headers: headers }
    );
  }

  updateUser(user: User): Observable<BackendResponce<User>> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.put<BackendResponce<User>>(
      this.readEnvFile.getKrakend() + '/users',
      user,
      { headers: headers }
    );
  }

  deleteUser(): Observable<BackendResponce<string>> {
    const headers = new HttpHeaders({
      'uuid': this.userLog.getUuidUser()
    });

    return this.http.delete<BackendResponce<string>>(
      this.readEnvFile.getKrakend() + '/users',
      {
        headers: headers
      }
    );
  }
}
