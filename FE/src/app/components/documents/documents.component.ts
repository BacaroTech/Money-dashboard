import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private balance: BalanceService, private router: Router) { }

  onDeleteFlow:Function = () => {
    console.log("todo delete document");
  }

  onUpdateFlow:Function = (id: number) => {
    this.router.navigateByUrl('/modify/'+id);
  }

  ngOnInit(): void {
    this.balance.getAllDocument()
    .subscribe({
      next: (data: Documents[]) => {
        
        this.normalizationDocument(data);     
        this.datas = data.reverse()
      },
      error: (error) => {
        console.error(error)
      }
    }) 
  }

  private normalizationDocument(datas: Documents[]){
    return datas.map(data => {
      data.data_inserimento = data.data_inserimento.split('T')[0];
      data.data_ultimo_aggiornamento = data.data_ultimo_aggiornamento.split('T')[0];
      data.bilancio = data.contante + data.conto + data.altro;
    })
  }

}
