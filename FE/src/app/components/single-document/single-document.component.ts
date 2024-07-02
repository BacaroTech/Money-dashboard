import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Documents } from 'src/app/model/document';
import MoneyStatus from 'src/app/model/moneystatus';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-single-document',
  templateUrl: './single-document.component.html',
  styleUrls: ['./single-document.component.css']
})
export class SingleDocumentComponent implements OnInit {
  idDocument: string = "";
  myBalance: Documents | null = null;
  monthDocument: string = this.convertToName(new Date().toJSON().slice(0, 10).split('-')[1]);

  titles: string[] = ["Conto corrente", "Contanti", "Altri conti aggregati"];
  
  //incrementato, decrementato, uguale
  //TODO DA SISTEMARE QUESTO A BACKEND LA API
  values: MoneyStatus[] = [
    {value: 0, status: "uguale", difference: 0},
    {value: 0, status: "uguale", difference: 0},
    {value: 0, status: "uguale", difference: 0}
  ]

  constructor(private route: ActivatedRoute, private balance: BalanceService) { }

  ngOnInit(): void {
    this.idDocument = this.route.snapshot.url[0].path;

    this.balance.getDocumentById({"id":this.idDocument})
      .subscribe((data: Documents[]) => {
        console.log(data)
        if (data && data.length > 0) {
          this.myBalance = data[0];
          this.myBalance.bilancio = this.myBalance.contante + this.myBalance.altro + this.myBalance.conto
          this.values[0].value = this.myBalance.conto;
          this.values[1].value = this.myBalance.contante;
          this.values[2].value = this.myBalance.altro;
        }
      })
    
  }

  convertToName(numberMonth: string): string{
    const months = new Map([
      ["01", "gennaio"],
      ["02", "febbraio"],
      ["03", "marzo"],
      ["04", "aprile"],
      ["05", "maggio"],
      ["06", "giugno"],
      ["07", "luglio"],
      ["08", "agosto"],
      ["09", "settembre"],
      ["10", "ottobre"],
      ["11", "novembre"],
      ["12", "dicembre"],
    ]);
    return months.get(numberMonth) as string;
  }

}
