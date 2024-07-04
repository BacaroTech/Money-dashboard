import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ArcElement,
  BarController, BarElement, CategoryScale, Chart,
  ChartItem, Decimation, DoughnutController, Filler, Legend, LineController, LineElement,
  LinearScale, PointElement, PolarAreaController, RadialLinearScale, Title, Tooltip, registerables
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @Input() datas!: any[];
  @Input() label!: any[];
  @Input() description!: string;
  @Input() type!: string;
  @ViewChild('dynamicElement') element!: ElementRef;

  constructor() {
    Chart.register(
      BarElement, LinearScale, LineController, PointElement, LineElement, BarController, CategoryScale,
      Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement
    );
  }

  ngOnInit(): void {
    console.log(this.datas)
   }

  ngAfterViewInit(): void {
    const ctx = (this.element.nativeElement.id) as ChartItem;
    switch (this.element.nativeElement.id) {
      case 'conti':
        this.buildChart(ctx, 'bar');
        break;
      case 'patrimonio':
        this.buildChart(ctx, 'bar');
        break;
      case 'rapporto':
        this.buildChart(ctx, 'line');
        break;
      case 'bilancio':
        this.buildChart(ctx, 'doughnut');
        break;
      default:
        console.error('questo grafico non è presente');
        break;
    }
  }

  private buildChart(ctx: ChartItem, typeChar: any) {
    new Chart(ctx, {
      type: typeChar,
      data: {
        labels: this.label,
        datasets: [{
          label: this.description,
          data: this.datas,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        options: { }
      }
    });
  }
}
