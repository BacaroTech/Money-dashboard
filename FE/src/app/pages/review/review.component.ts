import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { FilterOperations } from 'src/app/model/filterOperations';
import { BackendResponce } from 'src/app/model/responce';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { MultipleOperations } from 'src/app/model/multipleOperations';
import { Router } from '@angular/router';
import { OperationEnum } from 'src/app/enum/operationEnum';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { PaginatorComponent } from "src/app/components/paginator/paginator.component";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  standalone: true,
  imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule, PaginatorComponent],
})
export class ReviewComponent implements OnInit {
  public operationTypeService: OperationTypeService = inject(OperationTypeService);
  public operationProviderService: OperationProviderService = inject(OperationProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);
  private router: Router = inject(Router);

  isFiltersOpen: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  filterForm: FilterOperations = {
    startDate: new Date(),
    endDate: new Date(),
    typeOperation: OperationEnum.INCOMING,
  };
  bankAccountUuid: string = this.router.url.split('/')[2];
  pageSize: number = 10; //default
  pageNumber: number = 0; //default
  errorMessage: string = "";
  operationsToShow?: MultipleOperations;
  arrowIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.arrow);
  
  constructor() { }

  ngOnInit(): void {
    this.isError = false;
    this.isLoading = true;
    this.operationProviderService.getOperationByUserPaginated(this.bankAccountUuid, this.pageNumber, this.pageSize).subscribe({
      next: (backendResponse: BackendResponce<MultipleOperations>) => {
        console.log(backendResponse.message, backendResponse.content);
        this.operationsToShow = backendResponse.content;
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

  public clearForm(){
    this.filterForm.startDate = new Date();
    this.filterForm.endDate = new Date();
    this.filterForm.typeOperation = OperationEnum.INCOMING;
  }
}
