import { Component, OnInit } from '@angular/core';
import convertToName from 'src/app/common/mappingMonth';
import { CashFlow } from 'src/app/model/cashFlow';
import { Documents } from 'src/app/model/document';
import { BalanceProviderService } from 'src/app/provider/balance.provider';
import { FlowProviderService } from 'src/app/provider/flow.provider';
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [DashboardComponent, ErrorMessageLabelComponent, LoaderComponent, CommonModule]
})
export class HomeComponent implements OnInit {

  datasBilancioValue: Number[] = [];
  datasBilancioLabelX: String[] = [];
  datasFlowValue: number[] = [];
  datasFlowLabelX: String[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private balance: BalanceProviderService, 
    private flow: FlowProviderService
  ) {}

  ngOnInit(): void {
    /*this.balance.getAllDocument()
    .subscribe({
      next: (data: Documents[]) => {     
        this.datasBilancioValue = [];
        this.datasBilancioLabelX = [];
        this.normalizationDocumentForChar(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    }) 

    this.flow.getAllFlow()
    .subscribe({
      next: (data: CashFlow[]) => {
        this.datasFlowValue = [];
        this.datasFlowLabelX = [];
        this.normalizationHomeFlow(data);
        this.isLoading = false;     
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    })*/ 
  }

  private normalizationDocumentForChar(datas: Documents[]){
    datas.forEach(data => {
      this.datasBilancioLabelX.push(convertToName(data.data_inserimento.split('-')[1]));
      this.datasBilancioValue.push(
        data.contante + data.altro + data.conto
      );
    })
  }

  private normalizationHomeFlow(datas: CashFlow[]): void{
    datas.map(data => {
      data.data_inserimento = convertToName(data.data_inserimento.split('-')[1]);
      if(data.categoria != "Entrata"){
        data.importo = (Number(data.importo) * -1).toString(); 
      }
    })
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
}
