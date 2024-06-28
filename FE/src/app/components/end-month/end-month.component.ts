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

  alerts: Alert[] = []
  insert: "succed" | "fail" | "todo" = "todo";
  exist: boolean = false;
  load: boolean = false;

  bioSection = new FormGroup({
    conto: new FormControl<number>(0),
    contante: new FormControl<number>(0),
    altro: new FormControl<number>(0),
  });

  constructor(private balance: BalanceService) { }

  ngOnInit(): void {
    this.insert = "todo";
    this.balance.getAllDocumentByMonth({ "date": new Date().toJSON().slice(0, 10) })
      .subscribe((data: Documents[]) => {
        if (data && data.length > 0) {
          this.exist = true;
          this.alerts.push(
            {
              title: "Inserimento",
              description: "Per questo mese hai già inserito un documento di fine mese, clicca per modificarlo", 
              action: "dashboard",       //da sistemare action con pagina per modifiche
              type: "important"
            }
          )
        }
      })
  }

  ngSubmit(): void {
    if(!this.exist){
      this.load = true;
      this.balance.insertDocument(this.createDocument())
      .subscribe((data: Documents[]) => {
        if (data && data.length > 0) {
          this.insert = "succed";
          this.exist = true;
        } else {
          this.insert = "fail";
        }
        this.load = false;
      })
    }
    
  }

  createDocument(): Documents[] {
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
