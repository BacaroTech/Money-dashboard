import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankType } from 'src/app/enum/backEnum';
import { User } from 'src/app/model/user';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { ErrorMessageLabelComponent } from "../error-message-label/error-message-label.component";
import { LoaderComponent } from "../loader/loader.component";
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.css',
  imports: [CommonModule, FormsModule, ErrorMessageLabelComponent, LoaderComponent],
  inputs: ['currentUser', 'isEdit']
})
export class BankListComponent {
  currentUser?: User;
  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;

  private userLog = inject(UserLogService);
  private backAccountProviderService = inject(BackAccountProviderService);
  public bankAccountTypeService = inject(BankAccountTypeService);

  removeBankAccount(index: number){
    if(this.currentUser?.bank_accounts){
      if(this.currentUser.bank_accounts[index].uuid){
        this.isLoading = true;
        this.isError = false;
        this.backAccountProviderService.deleteBankAccount(this.userLog.getUuidUser(), this.currentUser.bank_accounts[index].uuid).subscribe(
          {
            next: ((uuidBankAccountDeleted: string) => {
              console.error("Cancellazione del conto corrente avvenuta con successo", uuidBankAccountDeleted);
              this.isError = false;
              this.isLoading = true;
            }),
            error:((err) => {
              console.error("Errore durante l\'eliminazione del conto corrente:", err);
              this.isError = true;
              this.isLoading = true;
            })
          }
        )
      }else{
        this.currentUser?.bank_accounts?.splice(index, 1);
      }
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
