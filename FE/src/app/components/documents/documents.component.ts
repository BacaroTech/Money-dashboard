import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/model/document';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  titles: string[] = [
    "ID", "Data Inserimento", "Data ultimo aggiornamento", "Bilancio"
  ] 

  datas: Documents[] = [
    {id: "1", dateInsert: "01-01-2020", dateLastUpdate: "01-01-2020", balance: "1000$"},
    {id: "2", dateInsert: "01-01-2020", dateLastUpdate: "01-01-2020", balance: "1000$"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
