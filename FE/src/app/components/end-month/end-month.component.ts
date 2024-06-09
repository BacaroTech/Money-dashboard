import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Alert } from 'src/app/model/alert';

@Component({
  selector: 'app-end-month',
  templateUrl: './end-month.component.html',
  styleUrls: ['./end-month.component.css']
})
export class EndMonthComponent implements OnInit {

  alerts: Alert[] = [
    {title: "alert1", description: "description1", action:"/dashboard", type:"info"},
    {title: "alert2", description: "description2", action:"/review", type:"important"},
  ]
  insert: "succed"| "fail" | "todo" = "todo";

  bioSection = new FormGroup({
    cc: new FormControl<number>(0),
    cash: new FormControl<number>(0),
    others: new FormControl<number>(0),
  });

  constructor() { }

  ngOnInit(): void {
    this.insert = "todo";
  }

  ngSubmit(): void{
    console.log(this.bioSection.value)
    this.insert = "fail";
  }

}
