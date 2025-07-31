import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { BankAccount } from 'src/app/model/bankAccount';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { BackendResponce } from 'src/app/model/responce';
import { ButtonComponent } from "src/app/components/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-bank-account',
  imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, ButtonComponent],
  templateUrl: './select-bank-account.component.html',
  styleUrl: './select-bank-account.component.css'
})
export class SelectBankAccountComponent implements OnInit{
  isError: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";
  private backAccountProviderService: BackAccountProviderService = inject(BackAccountProviderService);
  private router: Router = inject(Router);

  allBankAccounts: BankAccount[] = [];

  ngOnInit(): void {
    this.backAccountProviderService.getBankAccountByUser().subscribe({
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
    this.router.navigateByUrl('review/'+parameters[0]);
  }
}
