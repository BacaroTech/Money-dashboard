import { Component, OnInit } from '@angular/core';
import { CashFlow } from 'src/app/model/cashFlow';
import { Documents } from 'src/app/model/document';
import { BalanceService } from 'src/app/services/balance.service';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datasBilancioValue: Number[] = [];
  datasBilancioLabelX: String[] = [];
  datasFlowValue: number[] = [];
  datasFlowLabelX: String[] = [];
  isLoadingBalance: boolean = true;
  isLoadingDocument: boolean = true;

  constructor(private balance: BalanceService, private flow: FlowService) {}

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

    this.flow.getAllFlow()
    .subscribe({
      next: (data: CashFlow[]) => {
        this.datasFlowValue = [];
        this.datasFlowLabelX = [];
        this.normalizationFlow(data);
        this.isLoadingDocument = false;     
      },
      error: (error) => {
        console.log(error);
        this.isLoadingDocument = false;
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

  normalizationFlow(datas: CashFlow[]): void{
    datas.map(data => {
      data.data_inserimento = this.convertToName(data.data_inserimento.split('-')[1]);
      if(data.categoria != "Entrata"){
        data.importo = (Number(data.importo) * -1).toString(); 
      }
    })
    console.log(datas)
    let mapMouthsFlow = new Map<string, number>();
    datas.forEach(data => {
      if(mapMouthsFlow.get(data.data_inserimento)){
        mapMouthsFlow.set(data.data_inserimento, mapMouthsFlow.get(data.data_inserimento) as number + Number(data.importo))
      }else{
        mapMouthsFlow.set(data.data_inserimento, Number(data.importo))
      }
    })
    this.datasFlowLabelX = Array.from(mapMouthsFlow.keys());
    this.datasFlowValue = Array.from(mapMouthsFlow.values());
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
