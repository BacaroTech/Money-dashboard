import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BanckAccount } from 'src/app/model/banckAccount';
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
    mail: '',
    confirm_mail: '',
    psw: '',
    name: '',
    surname: '',
    bankAccount: []
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
      this.isWarning3Modal = this.userToRegistry.bankAccount.length == 0;
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

  addBanckaccount(){
    this.userToRegistry.bankAccount.push({
      name: '',
      type: '',
      amount: 0
    })
  }

  removeBankAccount(index: number) {
    this.userToRegistry.bankAccount.splice(index, 1);
  }

  checkStepIsValid(currentStep: number): boolean{
    if(currentStep === 1){
      return this.isValidStepOne();
    } else if(currentStep === 2){
      return this.isValidStepTwo();
    } else if(currentStep === 3){
      return this.isValidStepThree();
    } else {
      return this.goToRegisterUser();
    }
  }

  private isValidStepOne(): boolean{
    return (
      this.userToRegistry.mail !== ''
      && this.userToRegistry.confirm_mail !== '' 
      && this.userToRegistry.psw !== ''
      && this.utils.checkPswHaveCorrectSize(this.userToRegistry.psw) 
      && this.utils.checkMailIsGoodFormated(this.userToRegistry.mail)
      && this.utils.checkMailIsGoodFormated(this.userToRegistry.confirm_mail)
      && this.userToRegistry.mail === this.userToRegistry.confirm_mail
    );
  }

  private isValidStepTwo(): boolean{
    return (
      this.userToRegistry.name !== ''
      && this.userToRegistry.surname !== ''
    );
  }

  private isValidStepThree(): boolean{
    return (
      this.userToRegistry.bankAccount.filter(
        ((singleBankAccount: BanckAccount) => {
          return (
            singleBankAccount.amount == 0
            || singleBankAccount.name == ''
            || singleBankAccount.type == ''
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
