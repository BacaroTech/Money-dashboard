import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent implements OnInit {
  isLoading: boolean = false;
  isError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
