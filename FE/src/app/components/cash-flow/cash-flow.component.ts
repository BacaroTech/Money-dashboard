import { Component, OnInit } from '@angular/core';
import { cashFlow } from 'src/app/model/cashFlow';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  titles: string[] = [
    "Data", "Natura", "Categoria", "Importo"
  ] 

  datas: cashFlow[] = [
    {date: "01-01-2020", nature: "entrata", category: "stipendio", import: "1000$"},
    {date: "03-01-2020", nature: "uscita", category: "casa e bollette", import: "300$"},
  ]

}
