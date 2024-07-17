import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CashFlow } from 'src/app/model/cashFlow';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  titles: string[] = [
    "ID", "Data", "Natura", "Categoria", "Importo"
  ] 

  datasIn: CashFlow[] = [];
  datasOut: CashFlow[] = [];

  onDeleteFlow:Function = () => {
    console.log("todo delete flow");
  }

  onUpdateFlow:Function = () => {
    console.log("todo update flow");
  }

  constructor(private flow: FlowService) { }

  ngOnInit(): void {
    this.singlePostForMonth(new Date().toJSON().slice(0, 10))
  }

  dateSection = new FormGroup({
    date: new FormControl<String>((new Date()).toISOString().substring(0,10))
  });

  ngSubmit(): void{
    this.singlePostForMonth(this.dateSection.value.date as string);
  }

  private normalizationCashFlow(datas: CashFlow[]): void{
    datas.map(data => {
      data.data_inserimento = data.data_inserimento.split('T')[0];
      if(data.categoria === "Entrata"){
        this.datasIn.push(data);
      }else{
        this.datasOut.push(data);
      }
    })    
  }

  private singlePostForMonth(date: string){
    this.flow.postForMonth(date)
    .subscribe({
      next: (data: CashFlow[]) => {
        
        this.datasIn = [];
        this.datasOut = [];
        this.normalizationCashFlow(data);     
      },
      error: (error) => {
        console.error(error)
      }
    }) 
  }

  
}
