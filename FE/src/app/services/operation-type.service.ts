import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {
  private types: string[] = ['INCOMING','OUTCOMING'];

  getTypes(){
    return this.types;
  }
}
