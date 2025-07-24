import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { Operation } from 'src/app/model/operation';
import { OperationEnum } from 'src/app/enum/operationEnum';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-operation',
    templateUrl: './add-operation.component.html',
    styleUrls: ['./add-operation.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule]
})
export class AddOperationComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;

  newOperation: Operation = {
    amount: 0,
    description: '',
    category: OperationEnum.INCOMING,
    date: new Date(),
  }

  private backAccountProviderService = inject(BackAccountProviderService);
  private operationProviderService = inject(OperationProviderService);

  constructor() { }

  ngOnInit(): void {
  }

  addNewOperation(){

  }

  clearForm(){
    this.newOperation = {
      amount: 0,
      description: '',
      category: OperationEnum.INCOMING,
      date: new Date(),
    }
  }

}
