import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: true,
    imports: [ErrorMessageLabelComponent, LoaderComponent, CommonModule]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  isEdit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;

  ngOnInit(): void {
  }

  goToDelete(): void{

  }

  goToEdit(): void{
    this.isEdit = true;
  }

  goToSave(): void{
    this.isEdit = false;
  }

}
