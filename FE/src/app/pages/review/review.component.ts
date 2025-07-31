import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { FilterOperations } from 'src/app/model/filterOperations';
import { BankTypeEnum } from 'src/app/enum/bankEnum';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { BankAccount } from 'src/app/model/bankAccount';
import { BackendResponce } from 'src/app/model/responce';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { MultipleOperations } from 'src/app/model/multipleOperations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  standalone: true,
  imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule]
})
export class ReviewComponent implements OnInit {
  public bankAccountTypeService: BankAccountTypeService = inject(BankAccountTypeService);
  public operationProviderService: OperationProviderService = inject(OperationProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);
  private router: Router = inject(Router);

  isFiltersOpen: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  filterForm: FilterOperations = {
    startDate: new Date(),
    endDate: new Date(),
    typeBankAccount: BankTypeEnum.CASH,
    bankAccountUuid: ''
  };
  bankAccountUuid: string = this.router.url.split('/')[2];
  pageSize: number = 10; //default
  pageNumber: number = 0; //default
  errorMessage: string = "";

  arrowIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.arrow);

  constructor() { }

  ngOnInit(): void {
    
    this.isError = false;
    this.isLoading = true;
    this.operationProviderService.getOperationByUserPaginated(this.bankAccountUuid, this.pageNumber, this.pageSize).subscribe({
      next: (backendResponse: BackendResponce<MultipleOperations>) => {
        console.log(backendResponse.message, backendResponse.content);
        this.isError = false;
        this.isLoading = false;
      },
      error: (err: BackendResponce<MultipleOperations>) => {
        this.badApiCall(err);
      }
    });
  }

  toggleFilters(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  private badApiCall(err: BackendResponce<any>){
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
}
