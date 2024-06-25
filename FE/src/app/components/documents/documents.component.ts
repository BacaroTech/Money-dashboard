import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/model/document';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  titles: string[] = [
    "ID", "Data Inserimento", "Data ultimo aggiornamento", "Bilancio"
  ] 

  datas: Documents[] = []

  constructor(private balance: BalanceService) { }

  ngOnInit(): void {
    this.balance.getAllDocument()
    .subscribe({
      next: (data: Documents[]) => {
        console.log(data)
        this.normalizationDocument(data);     
        this.datas = data
      },
      error: (error) => {
        console.log(error)
      }
    }) 
  }

  normalizationDocument(datas: Documents[]){
    return datas.map(data => {
      data.data_inserimento = data.data_inserimento.split('T')[0];
      data.data_ultimo_aggiornamento = data.data_ultimo_aggiornamento.split('T')[0];
      data.bilancio = data.contante + data.conto + data.altro;
    })
  }

}
