import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-operation',
    templateUrl: './add-operation.component.html',
    styleUrls: ['./add-operation.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule]
})
export class AddOperationComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
