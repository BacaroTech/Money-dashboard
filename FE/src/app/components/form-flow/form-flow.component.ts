import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CashFlow } from 'src/app/model/cashFlow';
import { FlowService } from 'src/app/services/flow.service';

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

  constructor(private flow: FlowService) { }

  ngOnInit(): void {
    this.insert = "todo";
  }

  ngSubmit(): void{
    console.log(this.bioSection.value)
    this.flow.insertFlow([this.bioSection.value] as CashFlow[])
    .subscribe((data: CashFlow[]) => {
      if(data && data.length > 0){
        this.insert = "succed"
      }else{
        this.insert = "fail"
      }
    })
  }

}
