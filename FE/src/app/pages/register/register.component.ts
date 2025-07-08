import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/model/register';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userToRegistry: Register = {
    mail1: '',
    mail2: '',
    psw: '',
    name: '',
    surname: '',
    bankAccount: []
  }
  currentStep = 1;
  steps = [
    'Account',
    'Conti',
    'Conferma'
  ];

  constructor(
    private http: HttpClient,
    public utils: UtilsService
  ) {

  }

  ngOnInit(): void {

  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  
  checkStepValid(currentStep: number): boolean{
    if(currentStep === 1){
      return this.utils.checkPswHaventCorrectSize(this.userToRegistry.psw) 
      || this.utils.checkMailIsBadFormated(this.userToRegistry.mail1)
      || this.utils.checkMailIsBadFormated(this.userToRegistry.mail2)
      || this.userToRegistry.mail1 === this.userToRegistry.mail2
    } else if(currentStep === 2){
      return true;
    } else {
      return true;
    }
  }
}
