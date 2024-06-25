import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Alert } from 'src/app/model/alert';
import { Documents } from 'src/app/model/document';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-end-month',
  templateUrl: './end-month.component.html',
  styleUrls: ['./end-month.component.css']
})
export class EndMonthComponent implements OnInit {

  alerts: Alert[] = [
    //{title: "alert1", description: "description1", action:"/dashboard", type:"info"},
    //{title: "alert2", description: "description2", action:"/review", type:"important"},
  ]
  insert: "succed"| "fail" | "todo" = "todo";

  bioSection = new FormGroup({
    conto: new FormControl<number>(0),
    contante: new FormControl<number>(0),
    altro: new FormControl<number>(0),
  });

  constructor(private balance: BalanceService) { }

  ngOnInit(): void {
    this.insert = "todo";
  }

  ngSubmit(): void{
    this.balance.insertDocument(this.createDocument())
    .subscribe((data: Documents[]) => {
      if(data && data.length > 0){
        this.insert = "succed"
      }else{
        this.insert = "fail"
      }
    })
  }

  createDocument(): Documents[]{
    return [
      {
        id: 0, 
        data_inserimento: new Date().toJSON().slice(0, 10),
        data_ultimo_aggiornamento: new Date().toJSON().slice(0, 10),
        conto: this.bioSection.value.conto as number,
        contante: this.bioSection.value.contante as number,
        altro: this.bioSection.value.altro as number,
      }
    ];
  }

}
