import { HttpClient } from '@angular/common/http';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BankTypeEnum} from 'src/app/enum/bankEnum';
import { BankAccount } from 'src/app/model/bankAccount';
import { Register } from 'src/app/model/register';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "src/app/components/modal/modal.component";
import { BankListComponent } from "src/app/components/bank-list/bank-list.component";
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { BackendResponce } from 'src/app/model/responce';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ErrorMessageLabelComponent, LoaderComponent, CommonModule, FormsModule, ModalComponent, BankListComponent]
})
export class RegisterComponent implements OnInit {

  userToRegistry: Register = {
    email: '',
    confirm_email: '',
    password: '',
    first_name: '',
    last_name: '',
    bank_accounts: []
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
  isError: boolean = false;
  isLoading: boolean = false;
  IconsSVGEnum = IconsSVGEnum;
  errorMessage: string = "";

  public utils: UtilsService = inject(UtilsService);
  private router: Router = inject(Router);
  private profileProvider: ProfileProviderService = inject(ProfileProviderService);

  constructor() { }

  ngOnInit(): void {

  }

  nextStep() {
    if (this.currentStep == 3) {
      this.isClick3Step = true;
      this.isWarning3Modal = this.userToRegistry.bank_accounts.length == 0;
    }

    if (this.currentStep == 4) {
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

  addBankAccount() {
    this.userToRegistry.bank_accounts.push({
      name: '',
      type: BankTypeEnum.DIGITAL,
      amount: 0
    })
  }

  removeBankAccount(index: number) {
    this.userToRegistry.bank_accounts.splice(index, 1);
  }

  checkStepIsValid(currentStep: number): boolean {
    if (currentStep === 1) {
      return this.isValidStepOne();
    } else if (currentStep === 2) {
      return this.isValidStepTwo();
    } else if (currentStep === 3) {
      return this.isValidStepThree();
    } else {
      return true;
    }
  }

  private isValidStepOne(): boolean {
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

  private isValidStepTwo(): boolean {
    return (
      this.userToRegistry.first_name !== ''
      && this.userToRegistry.last_name !== ''
    );
  }

  private isValidStepThree(): boolean {
    return (
      this.userToRegistry.bank_accounts.filter(
        ((singleBankAccount: BankAccount) => {
          return (
            singleBankAccount.amount == 0
            || singleBankAccount.name == ''
            || (singleBankAccount.type == BankTypeEnum.DIGITAL)
          )
        })
      )
    ).length == 0;
  }

  private goToRegisterUser(): void {
    this.isError = false;
    this.isLoading = true;
    this.profileProvider.registerUser(this.userToRegistry).subscribe(
      {
        next: (backendResponce: BackendResponce<string>) => {
          console.log(backendResponce.message, backendResponce.content);
          this.isError = false;
          this.isLoading = false;
          this.router.navigateByUrl('/dashboard');
        },
        error: (err: BackendResponce<string>) => {
          this.badApiCall(err);
        }
      }
    )
  }

  private badApiCall(err: BackendResponce<any>){
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
} 
