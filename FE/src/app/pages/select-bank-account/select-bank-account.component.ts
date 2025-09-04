import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { BankAccount } from 'src/app/model/bankAccount';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { BackendResponce } from 'src/app/model/responce';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Router } from '@angular/router';
import { ModalComponent } from "src/app/components/modal/modal.component";
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { BankTypeEnum } from 'src/app/enum/bankEnum';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { FormsModule } from '@angular/forms';
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';

@Component({
  selector: 'app-select-bank-account',
  imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, ButtonComponent, ModalComponent, FormsModule],
  templateUrl: './select-bank-account.component.html',
  styleUrl: './select-bank-account.component.css'
})
export class SelectBankAccountComponent implements OnInit {
  private backAccountProviderService: BackAccountProviderService = inject(BackAccountProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);
  private router: Router = inject(Router);
  public bankAccountTypeService = inject(BankAccountTypeService);

  isError: boolean = false;
  isLoading: boolean = false;
  isShowModal: boolean = false;
  isShowErrorMessage: boolean = false;
  isChangeBankAccount: boolean = false;
  errorMessage: string = "";
  IconsSVGEnum = IconsSVGEnum;
  checkIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.check);
  editIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.edit);
  allBankAccounts: BankAccount[] = [];

  ngOnInit(): void {
    this.backAccountProviderService.getBankAccountsByUser().subscribe({
      next: (backendResponce: BackendResponce<BankAccount[]>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.allBankAccounts = backendResponce.content!;
        this.isError = false;
        this.isLoading = false;
      },
      error: (err: BackendResponce<BankAccount[]>) => {
        console.log(err.message);
        this.errorMessage = err.message;
        this.isError = true;
        this.isLoading = false;
      }
    })
  }

  onViewDetails: Function = (parameters: any[]) => {
    this.router.navigateByUrl('review/' + parameters[0]);
  }

  openModalAddAccount(): void {
    if (this.allBankAccounts.length < 5){
      this.isShowModal = true;
    }
    else{
      this.isShowErrorMessage = true;
    }
  }

  closeModalAddAccount: Function = () => {
    this.isShowModal = false;
  }

  onAddAccount: Function = () => {
    this.backAccountProviderService.createBankAccountByUser({
      name: 'Name to change',
      type: BankTypeEnum.DIGITAL,
      amount: 0,
    })
      .subscribe({
        next: (backendResponce: BackendResponce<String>) => {
          console.log(backendResponce.message, backendResponce.content);
          this.isError = false;
          this.isLoading = false;
        },
        error: (err: BackendResponce<String>) => {
          console.log(err.message);
          this.errorMessage = err.message;
          this.isError = true;
          this.isLoading = false;
        }
      })
    window.location.reload();
  }

  onChangeBankAccount: Function = () => {
    this.isChangeBankAccount = !this.isChangeBankAccount;
    if (this.isChangeBankAccount == false) {
      this.backAccountProviderService.massiveUpdateBankAccountByUser(this.allBankAccounts)
        .subscribe({
          next: (backendResponce: BackendResponce<BankAccount[]>) => {
            console.log(backendResponce.message, backendResponce.content);
            this.allBankAccounts = backendResponce.content!;
            this.isError = false;
            this.isLoading = false;
          },
          error: (err: BackendResponce<BankAccount[]>) => {
            console.log(err.message);
            this.errorMessage = err.message;
            this.isError = true;
            this.isLoading = false;
          }
        })
      window.location.reload();
    }
  }
}
