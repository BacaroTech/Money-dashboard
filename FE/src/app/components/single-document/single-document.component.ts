import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import convertToName from 'src/app/common/mappingMonth';
import { Documents } from 'src/app/model/document';
import DocumentsBetween from 'src/app/model/documentsBetween';
import MoneyStatus from 'src/app/model/moneystatus';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-single-document',
  templateUrl: './single-document.component.html',
  styleUrls: ['./single-document.component.css'],
  standalone: false
})
export class SingleDocumentComponent implements OnInit {
  idDocument: string = "";
  myBalance: DocumentsBetween | null = null;
  monthDocument: string = convertToName(new Date().toJSON().slice(0, 10).split('-')[1]);
  balanceValues: number[] = []
  isLoading: boolean = true;

  titles: string[] = ["Conto corrente", "Contanti", "Altri conti aggregati"];
  
  values: MoneyStatus[] = [
    {value: 0, status: "uguale", difference: 0},
    {value: 0, status: "uguale", difference: 0},
    {value: 0, status: "uguale", difference: 0}
  ]

  constructor(private route: ActivatedRoute, private balance: BalanceService) { }

  ngOnInit(): void {
    this.idDocument = this.route.snapshot.url[0].path;

    this.balance.getDocumentById({"id":this.idDocument})
      .subscribe((data: DocumentsBetween[]) => {
        if (data && data.length > 0) {
          this.myBalance = data[0];
          this.myBalance.bilancio = this.myBalance.contante + this.myBalance.altro + this.myBalance.conto
          this.setValues(this.myBalance.conto, this.myBalance.contoold, 0);
          this.setValues(this.myBalance.contante, this.myBalance.contanteold, 1);
          this.setValues(this.myBalance.altro, this.myBalance.altroold, 2);
          this.balanceValues = [this.values[0].value, this.values[1].value, this.values[2].value];
        }
        this.isLoading = false
      })
    
  }

  private setValues(now: number, old: number, pos: number){
    let diff = now - old;
    if(diff > 0){
      this.values[pos].difference = diff;
      this.values[pos].status = 'incrementato'
    }else if(diff < 0){
      this.values[pos].difference = diff * -1;
      this.values[pos].status = 'decrementato'
    }
    this.values[pos].value = now;
  }

}
