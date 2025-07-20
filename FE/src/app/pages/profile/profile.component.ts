import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
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
