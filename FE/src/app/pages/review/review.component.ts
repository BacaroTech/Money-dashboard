import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css'],
    standalone: false
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

}
