import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/model/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input()
  alerts: Alert[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
