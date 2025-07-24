import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankAccountTypeService {
  private types: string[] = ['DIGITAL','CASH'];

  getTypes(){
    return this.types;
  }
}
