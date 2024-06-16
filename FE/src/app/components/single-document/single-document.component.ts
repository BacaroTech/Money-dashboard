import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MoneyStatus from 'src/app/model/moneystatus';

@Component({
  selector: 'app-single-document',
  templateUrl: './single-document.component.html',
  styleUrls: ['./single-document.component.css']
})
export class SingleDocumentComponent implements OnInit {
  idDocument: string = "";
  monthDocument: string = "";
  balance: string = "";
  titles: string[] = ["Conto corrente", "Contanti", "Altri conti aggregati"];
  values: MoneyStatus[] = [
    {value: "100", status: "incrementato", difference: "200"},
    {value: "200", status: "decrementato", difference: "20"},
    {value: "150", status: "uguale", difference: "0"}
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idDocument = this.route.snapshot.url[0].path;
    this.monthDocument = "Luglio"
    this.balance = "450"
  }

}
