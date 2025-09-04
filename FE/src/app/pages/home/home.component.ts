import { Component, inject, OnInit } from '@angular/core';
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { User } from 'src/app/model/user';
import { BackendResponce } from 'src/app/model/responce';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { BankAccount } from 'src/app/model/bankAccount';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [DashboardComponent, ErrorMessageLabelComponent, LoaderComponent, CommonModule]
})
export class HomeComponent implements OnInit {

  datasBilancioValue: number[] = [];
  datasBilancioLabelX: string[] = [];
  datasFlowValue: number[] = [];
  datasFlowLabelX: string[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  currentUser?: User;
  errorMessage: string = "";
  totalMoney: number = 0;

  private profileProviderService: ProfileProviderService = inject(ProfileProviderService);
  private backAccountProviderService: BackAccountProviderService = inject(BackAccountProviderService);

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.profileProviderService.getUser().subscribe({
      next: (backendResponce: BackendResponce<User>) => {
        console.log(backendResponce.message, backendResponce.content);
        this.currentUser = backendResponce.content!;
        this.loadBankAccounts();
        this.isLoading = false;
        this.isError = false;
      },
      error: (err: BackendResponce<User>) => {
        this.badApiCall(err);
      }
    })
  }

  private loadBankAccounts() {
    this.backAccountProviderService.getBankAccountsByUser().subscribe({
      next: (backendResponce: BackendResponce<BankAccount[]>) => {
        console.log(backendResponce.message, backendResponce.content);
        const bankAccounts = backendResponce.content!;

        this.datasBilancioLabelX = bankAccounts.map(bankAccount => bankAccount.name);
        this.datasBilancioValue = bankAccounts.map(bankAccount => bankAccount.amount);
        bankAccounts.forEach((bankAccount) => this.totalMoney += bankAccount.amount);
      },
      error: (err: BackendResponce<User>) => {
        this.badApiCall(err);
      }
    })
  }

  private badApiCall(err: BackendResponce<any>) {
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
}
