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
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { IconsSVGService } from 'src/app/services/icons-svg.service';

@Component({
    selector: 'app-add-operation',
    templateUrl: './add-operation.component.html',
    styleUrls: ['./add-operation.component.css'],
    standalone: true,
    imports: [LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule, ButtonComponent]
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

  private backAccountProviderService:BackAccountProviderService = inject(BackAccountProviderService);
  private operationProviderService:OperationProviderService = inject(OperationProviderService);
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);

  checkIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.check);
  trashIconSVG: string = this.iconsSVGService.getMapIcons(IconsSVGEnum.trash);

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
