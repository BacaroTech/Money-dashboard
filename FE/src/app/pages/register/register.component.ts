import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BankType } from 'src/app/enum/backEnum';
import { BankAccount } from 'src/app/model/bankAccount';
import { Register } from 'src/app/model/register';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userToRegistry: Register = {
    email: '',
    confirm_email: '',
    password: '',
    first_name: '',
    last_name: '',
    bank_account: []
  };
  currentStep = 1;
  steps = [
    'Account',
    'Anagrafica',
    'Conti',
    'Conferma'
  ];
  isClick3Step: boolean = false;
  isWarning3Modal: boolean = false;

  constructor(
    private http: HttpClient,
    public utils: UtilsService,
    private router: Router,
    private userLog: UserLogService,
    private profileProvider: ProfileProviderService,
    private userLogService: UserLogService
  ) { }

  ngOnInit(): void {

  }

  nextStep() {
    if(this.currentStep == 3){
      this.isClick3Step = true;
      this.isWarning3Modal = this.userToRegistry.bank_account.length == 0;
    }

    if(this.currentStep == 4){
      this.goToRegisterUser();
    }

    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  addBankAccount(){
    this.userToRegistry.bank_account.push({
      name: '',
      type: BankType.DIGITAL,
      amount: 0
    })
  }

  removeBankAccount(index: number) {
    this.userToRegistry.bank_account.splice(index, 1);
  }

  checkStepIsValid(currentStep: number): boolean{
    if(currentStep === 1){
      return this.isValidStepOne();
    } else if(currentStep === 2){
      return this.isValidStepTwo();
    } else if(currentStep === 3){
      return this.isValidStepThree();
    } else {
      return true;
    }
  }

  private isValidStepOne(): boolean{
    return (
      this.userToRegistry.email !== ''
      && this.userToRegistry.confirm_email !== '' 
      && this.userToRegistry.password !== ''
      && this.utils.checkPswHaveCorrectSize(this.userToRegistry.password) 
      && this.utils.checkMailIsGoodFormated(this.userToRegistry.email)
      && this.utils.checkMailIsGoodFormated(this.userToRegistry.confirm_email)
      && this.userToRegistry.email === this.userToRegistry.confirm_email
    );
  }

  private isValidStepTwo(): boolean{
    return (
      this.userToRegistry.first_name !== ''
      && this.userToRegistry.last_name !== ''
    );
  }

  private isValidStepThree(): boolean{
    return (
      this.userToRegistry.bank_account.filter(
        ((singleBankAccount: BankAccount) => {
          return (
            singleBankAccount.amount == 0
            || singleBankAccount.name == ''
            || singleBankAccount.type != BankType.DIGITAL
          )
        })
      )
    ).length == 0;
  }

  private goToRegisterUser(): any{
    this.profileProvider.registerUser(this.userToRegistry)
    .subscribe(
      {
        next: (uuid) => {
          this.userLogService.setUuidUser(uuid);
          console.log("Registrazione avvenuta con successo");
          this.router.navigateByUrl('/dashboard');
          this.userLog.setUuidUser(uuid);
        }, 
        error: (err) => {
          console.error("Si è verirficato un errore durante la registrazione: ", err);
        }
      }
    )
  }
} 
