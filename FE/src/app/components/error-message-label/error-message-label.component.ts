import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-message-label',
    templateUrl: './error-message-label.component.html',
    styleUrls: ['./error-message-label.component.css'],
    standalone: true,
    inputs: ['errorMessage']
})
export class ErrorMessageLabelComponent implements OnInit {
  errorMessage!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
