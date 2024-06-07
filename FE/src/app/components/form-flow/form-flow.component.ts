import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-flow',
  templateUrl: './form-flow.component.html',
  styleUrls: ['./form-flow.component.css']
})
export class FormFlowComponent implements OnInit {

  insert: "succed"| "fail" | "todo" = "todo";

  bioSection = new FormGroup({
    date: new FormControl<String>((new Date()).toISOString().substring(0,10)),
    nature: new FormControl<string>(''),
    category: new FormControl<string>(''),
    import: new FormControl<string>('')
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
