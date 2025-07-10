import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {
  constructor() { }

  private uuidUser: string = '';

  public getUuidUser(): string {
    return localStorage.getItem('uuidUser') ? localStorage.getItem('uuidUser') as string : '';
  }

  public setUuidUser(uuidNew: string): string {
    this.uuidUser = uuidNew;
    localStorage.setItem('uuidUser', uuidNew);
    return this.uuidUser;
  }

  public clearUuidUser(): void {
    this.uuidUser = '';
    localStorage.removeItem('uuidUser');
  }
}

