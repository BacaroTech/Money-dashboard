import { Component, Input, OnInit } from '@angular/core';
import { CashFlow } from 'src/app/model/cashFlow';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false
})
export class TableComponent implements OnInit {
  @Input()
  titles: string[] = [];

  @Input()
  datas: any[] = [];

  @Input()
  type: string = "";

  @Input()
  onModify: Function = () => {}

  @Input()
  onDelete: Function = () => {}

  constructor() { }

  ngOnInit(): void {
    
  }

}
