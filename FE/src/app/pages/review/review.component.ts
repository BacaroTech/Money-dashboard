import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  types: string[] = ['DIGITAL','CASH'];
  formData = {
    startdate: '',
    enddate: '',
    typeBankAccount: '',
  };

  constructor() { }

  ngOnInit(): void {
  }

  isFiltersOpen: boolean = false;

  toggleFilters(): void {
    this.isFiltersOpen = !this.isFiltersOpen;
  }
}
