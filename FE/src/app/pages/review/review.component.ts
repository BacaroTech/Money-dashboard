import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { FilterOperations } from 'src/app/model/filterOperations';
import { BankTypeEnum} from 'src/app/enum/bankEnum';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule]
})
export class ReviewComponent implements OnInit {
  isError: boolean = false;
  isLoading: boolean = false;
  filterForm: FilterOperations = {
    startDate: new Date(),
    endDate: new Date(),
    typeBankAccount: BankTypeEnum.CASH,
    bankAccountUuid: ''
  };

  public bankAccountTypeService = inject(BankAccountTypeService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);

  arrowIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.arrow);

  constructor() { }

  ngOnInit(): void {
  }

  isFiltersOpen: boolean = false;

  toggleFilters(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }
}
