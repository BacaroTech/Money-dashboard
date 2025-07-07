import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CashFlow } from 'src/app/model/cashFlow';
import { FlowProviderService } from 'src/app/provider/flow.provider';

@Component({
  selector: 'app-modify-flow',
  templateUrl: './modify-flow.component.html',
  styleUrls: ['./modify-flow.component.css'],
  standalone: false
})
export class ModifyFlowComponent implements OnInit {

  insert: "succed" | "fail" | "todo" = "todo";
  load: boolean = false;
  labelIn: string[] = ["Stipendio", "Welfare", "Extra"];
  labelOut: string[] = ["Casa", "Investimenti", "Svago", "Vestiti", "Spesa"];
  idDocument: string = "";

  bioSection = new FormGroup({
    date: new FormControl<String>((new Date()).toISOString().substring(0, 10)),
    nature: new FormControl<String>(''),
    category: new FormControl<String>(''),
    import: new FormControl<String>('')
  });

  constructor(
    private flow: FlowProviderService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.insert = "todo";
    this.idDocument = this.route.snapshot.url[0].path;
    //console.log(this.idDocument)
    this.flow.getFlowById({"id":this.idDocument})
    .subscribe((data: CashFlow[])=> {
      this.bioSection.setControl("date", new FormControl<String>(data[0].data_inserimento.split('T')[0]))
      this.bioSection.setControl("nature", new FormControl<String>(data[0].natura))
      this.bioSection.setControl("category", new FormControl<String>(data[0].categoria))
      this.bioSection.setControl("import", new FormControl<String>(data[0].importo))
    })
  }

  ngSubmit(): void {
    //todo
    this.load = true;
    if (this.bioSection.value.date && this.bioSection.value.category && this.bioSection.value.import && this.bioSection.value.nature) {
      let flowToUpdate: CashFlow = {
        id: this.idDocument,
        data_inserimento: this.bioSection.value.date as string,
        natura: this.bioSection.value.nature as string,
        categoria: this.bioSection.value.category as string,
        importo: this.bioSection.value.import as string
      }
      console.log(flowToUpdate)
      this.flow.updateFlow([flowToUpdate])
        .subscribe((data: CashFlow[]) => {
          console.log(data)
          if (data && data.length > 0) {
            this.insert = "succed";
          } else {
            this.insert = "fail";
          }
        })
    } else {
      this.insert = "fail";
      this.load = false;
    }

  }

}
