import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/model/document';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-cash-review',
  templateUrl: './cash-review.component.html',
  styleUrls: ['./cash-review.component.css']
})
export class CashReviewComponent implements OnInit {

  datasBilancioValue: Number[] = [];
  datasBilancioLabelX: String[] = [];
  isLoadingBalance: boolean = true;

  constructor(private balance: BalanceService) { }

  ngOnInit(): void {
    this.balance.getAllDocument()
    .subscribe({
      next: (data: Documents[]) => {     
        this.datasBilancioValue = [];
        this.datasBilancioLabelX = [];
        this.normalizationDocumentForChar(data);
        console.log(this.datasBilancioValue, this.datasBilancioLabelX)
        this.isLoadingBalance = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoadingBalance = false;
      }
    }) 
  }

  normalizationDocumentForChar(datas: Documents[]){
    datas.forEach(data => {
      this.datasBilancioLabelX.push(this.convertToName(data.data_inserimento.split('-')[1]));
      this.datasBilancioValue.push(
        data.contante + data.altro + data.conto
      );
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
