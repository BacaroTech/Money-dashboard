import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankType } from 'src/app/enum/backEnum';
import { User } from 'src/app/model/user';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { ErrorMessageLabelComponent } from "../error-message-label/error-message-label.component";
import { LoaderComponent } from "../loader/loader.component";
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';
import { Router } from '@angular/router';
import { BackendResponce } from 'src/app/model/responce';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css',
  imports: [CommonModule, FormsModule, ErrorMessageLabelComponent, LoaderComponent],
  inputs: ['currentUser', 'isEdit']
})
export class BankListComponent implements OnInit {
  currentUser?: User;
  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  isRegister: boolean = false;
  errorMessage: string = "";

  private backAccountProviderService = inject(BackAccountProviderService);
  public bankAccountTypeService = inject(BankAccountTypeService);
  private router = inject(Router);

  ngOnInit(): void {
    if(this.router.url.includes('register')){
      this.isRegister = true;
    }
  }

  removeBankAccount(index: number){
    if(this.currentUser?.bank_accounts){
      if(this.currentUser.bank_accounts[index].uuid){
        this.isLoading = true;
        this.isError = false;
        this.backAccountProviderService.deleteBankAccount(this.currentUser.bank_accounts[index].uuid).subscribe(
          {
            next: ((backendResponce: BackendResponce<string>) => {
              console.log("Cancellazione del conto corrente avvenuta con successo", backendResponce.content);
              this.isError = false;
              this.isLoading = false;
            }),
            error:((err: BackendResponce<string>) => {
              this.errorMessage = err.message;
              console.error(this.errorMessage+":", err);
              this.isError = true;
              this.isLoading = false;
            })
          }
        )
      }
      this.currentUser?.bank_accounts?.splice(index, 1);
    }
  }

  addBankAccount(){
    this.currentUser?.bank_accounts?.push({
      name: '',
      type: BankType.CASH,
      amount: 0
    })
  }
}
