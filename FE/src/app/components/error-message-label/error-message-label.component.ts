import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-message-label',
    templateUrl: './error-message-label.component.html',
    styleUrls: ['./error-message-label.component.css'],
    standalone: true
})
export class ErrorMessageLabelComponent implements OnInit {

  @Input()
  errorMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
