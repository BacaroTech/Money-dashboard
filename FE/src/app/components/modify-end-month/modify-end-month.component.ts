import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/model/alert';
import { Documents } from 'src/app/model/document';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-modify-end-month',
  templateUrl: './modify-end-month.component.html',
  styleUrls: ['./modify-end-month.component.css']
})
export class ModifyEndMonthComponent implements OnInit {

  alerts: Alert[] = []
  insert: "succed" | "fail" | "todo" = "todo";
  exist: boolean = false;
  load: boolean = false;
  idDocument: string = ""; 

  bioSection = new FormGroup({
    conto: new FormControl<number>(0),
    contante: new FormControl<number>(0),
    altro: new FormControl<number>(0),
  });

  constructor(private balance: BalanceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.insert = "todo";
    this.idDocument = this.route.snapshot.url[0].path;
    this.balance.getDocumentById({"id":this.idDocument})
    .subscribe(data => {
      this.bioSection.setControl("conto", new FormControl<number>(data[0].conto))
      this.bioSection.setControl("contante", new FormControl<number>(data[0].contante))
      this.bioSection.setControl("altro", new FormControl<number>(data[0].altro))
    })
    
  }

  ngSubmit(): void {
    if(!this.exist){
      this.load = true;
      //todo i'm going to replace with uppdate
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

  private createDocument(): Documents[] {
    
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
