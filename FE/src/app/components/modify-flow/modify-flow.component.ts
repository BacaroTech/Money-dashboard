import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CashFlow } from 'src/app/model/cashFlow';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-modify-flow',
  templateUrl: './modify-flow.component.html',
  styleUrls: ['./modify-flow.component.css']
})
export class ModifyFlowComponent implements OnInit {

  insert: "succed"| "fail" | "todo" = "todo";
  load: boolean = false;
  labelIn: string[] = ["Stipendio", "Welfare", "Extra"];
  labelOut: string[] = ["Casa", "Investimenti", "Svago", "Vestiti", "Spesa"];
  idDocument: string = ""; 

  bioSection = new FormGroup({
    date: new FormControl<String>((new Date()).toISOString().substring(0,10)),
    nature: new FormControl<string>(''),
    category: new FormControl<string>(''),
    import: new FormControl<string>('')
  });

  constructor(private flow: FlowService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.insert = "todo";
    this.idDocument = this.route.snapshot.url[0].path;
    /*this.flow.getDocumentById({"id":this.idDocument})
    .subscribe(data => {
      this.bioSection.setControl("conto", new FormControl<number>(data[0].conto))
      this.bioSection.setControl("contante", new FormControl<number>(data[0].contante))
      this.bioSection.setControl("altro", new FormControl<number>(data[0].altro))
    })*/
  }

  ngSubmit(): void{
    //todo
    this.load = true;
    if(this.bioSection.value.date && this.bioSection.value.category && 
      this.bioSection.value.import && this.bioSection.value.nature)
    this.flow.insertFlow([this.bioSection.value] as CashFlow[])
    .subscribe((data: CashFlow[]) => {
      if(data && data.length > 0){
        this.insert = "succed";
      }else{
        this.insert = "fail";
      }
    })
    this.insert = "fail";
    this.load = false;
  }

}
