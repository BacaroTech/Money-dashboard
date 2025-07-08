import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  checkMailIsBadFormated(mail: string){
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return mail != "" && !regexp.test(mail) ;
  }

  checkPswHaventCorrectSize(psw: string){
    return psw.length != 0 && !(psw.length >= 8 && psw.length <= 16)
  }
}
