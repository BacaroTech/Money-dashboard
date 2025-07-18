import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  constructor() { }

  private uuidUser: string = '';

  public getUuidUser(): string {
    return sessionStorage.getItem('uuidUser') ? sessionStorage.getItem('uuidUser') as string : '';
  }

  public setUuidUser(uuidNew: string): string {
    this.uuidUser = uuidNew;
    sessionStorage.setItem('uuidUser', uuidNew);
    return this.uuidUser;
  }

  public clearUuidUser(): void {
    this.uuidUser = '';
    sessionStorage.removeItem('uuidUser');
  }
}

