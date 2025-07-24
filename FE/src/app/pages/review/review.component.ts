import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankAccountTypeService } from 'src/app/services/bank-account-type.service';

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
  formData = {
    startdate: '',
    enddate: '',
    typeBankAccount: '',
  };

  public bankAccountTypeService = inject(BankAccountTypeService);

  constructor() { }

  ngOnInit(): void {
  }

  isFiltersOpen: boolean = false;

  toggleFilters(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }
}
