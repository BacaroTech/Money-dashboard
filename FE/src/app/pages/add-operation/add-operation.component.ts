import { Component, inject, OnInit } from '@angular/core';
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { CommonModule } from '@angular/common';
import { BackAccountProviderService } from 'src/app/provider/back-account.provider';
import { OperationProviderService } from 'src/app/provider/operation.provider';
import { Operation } from 'src/app/model/operation';
import { OperationEnum } from 'src/app/enum/operationEnum';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "src/app/components/button/button.component";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-add-operation',
    templateUrl: './add-operation.component.html',
    styleUrls: ['./add-operation.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule, ButtonComponent]
})
export class AddOperationComponent implements OnInit {

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  isLoading: boolean = false;
  isError: boolean = false;
  trashIconSVG:string = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>`) as string;
  checkIconSVG:string = this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>`)as string

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

  addNewOperation: Function = () => {

  }

  //da passare al componete bottone, deve essere una arrow function
  clearForm: Function = () => {
    this.newOperation = {
      amount: 0,
      description: '',
      category: OperationEnum.INCOMING,
      date: new Date(),
    }
  }

}
