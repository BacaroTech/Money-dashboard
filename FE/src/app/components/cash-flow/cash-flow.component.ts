import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CashFlow } from 'src/app/model/cashFlow';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  titles: string[] = [
    "ID", "Data", "Natura", "Categoria", "Importo"
  ] 

  datas: CashFlow[] = [
    {id:"1", date: "01-01-2020", nature: "entrata", category: "stipendio", import: "1000€"},
    {id:"2", date: "03-01-2020", nature: "uscita", category: "casa e bollette", import: "300€"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  dateSection = new FormGroup({
    date: new FormControl<String>((new Date()).toISOString().substring(0,10))
  });

  ngSubmit(): void{
    console.log(this.dateSection.value);
  }
}
