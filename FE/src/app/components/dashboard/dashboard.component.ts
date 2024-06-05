import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartItem, Decimation, Filler, Legend, LinearScale, Title, Tooltip, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @Input() type!: string;
  @ViewChild('dynamicElement') element!: ElementRef;

  constructor() {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip, LinearScale);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const ctx = this.element.nativeElement.id;
    switch(this.element.nativeElement.id){
      case 'conti': 
        console.log('conti');
        this.buildChart(ctx as ChartItem);
        break;
      case 'patrimonio': 
        console.log('patrimonio');
        this.buildChart(ctx as ChartItem);
        break;
      case 'rapporto': 
        console.log('rapporto');
        this.buildChart(ctx as ChartItem);
        break;
      default:
        console.error('questo grafico non è presente');
        break;
    }
  }

  private buildChart(ctx: ChartItem){
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
