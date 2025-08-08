import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { Operation } from 'src/app/model/operation';
import { OperationEnum } from 'src/app/enum/operationEnum';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "src/app/components/button/button.component";
import { DomSanitizer } from '@angular/platform-browser';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { BackendResponce } from 'src/app/model/responce';
import { BankAccount } from 'src/app/model/bankAccount';
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';
import { BankTypeEnum } from 'src/app/enum/bankEnum';
import { OperationTypeService } from 'src/app/services/operation-type.service';

@Component({
    selector: 'app-add-operation',
    templateUrl: './add-operation.component.html',
    styleUrls: ['./add-operation.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule, ButtonComponent]
})
export class AddOperationComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = "";
  allBankAccounts!: BankAccount[];
  bankAccountUuid!: string;

  newOperation: Operation = {
    amount: 0,
    description: '',
    category: OperationEnum.INCOMING,
    date: new Date(),
  }

  private backAccountProviderService:BackAccountProviderService = inject(BackAccountProviderService);
  private operationProviderService:OperationProviderService = inject(OperationProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);
  public operationTypeService: OperationTypeService = inject(OperationTypeService);

  checkIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.check);
  trashIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.trash);

  constructor() { }

  ngOnInit(): void {
    this.isError = false;
    this.isLoading = true;
    this.backAccountProviderService.getBankAccountByUser()
    .subscribe({
      next: (backendResponce: BackendResponce<BankAccount[]>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.allBankAccounts = backendResponce.content!;
        this.isError = false;
        this.isLoading = false;
      },
      error: (err: BackendResponce<BankAccount[]>) => {
        this.badApiCall(err);
      }
    })
  }

  onBankAccountModelChange(selectedUuid: string) {
    console.log('UUID selezionato:', selectedUuid);
    this.bankAccountUuid = selectedUuid;
  }

  //da passare al componete bottone, deve essere una arrow function
  addNewOperation: Function = () => {
    this.isLoading = true;
    this.isError = false;
    
    if(this.newOperation.category == OperationEnum.OUTCOMING){
      this.newOperation.amount *= -1;
    }

    this.operationProviderService.insertOperationByUser(this.bankAccountUuid, this.newOperation).subscribe({
      next: (backendResponce: BackendResponce<string>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.isLoading = false;
        this.isError = false;
      },
      error: (err: BackendResponce<string>) => {
        this.badApiCall(err);
      }
    })
  }

  clearForm: Function = () => {
    this.newOperation = {
      amount: 0,
      description: '',
      category: OperationEnum.INCOMING,
      date: new Date(),
    }
  }

  private badApiCall(err: BackendResponce<any>){
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
}
