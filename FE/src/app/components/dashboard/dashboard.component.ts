import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  BarController, BarElement, CategoryScale, Chart,
  ChartItem, Decimation, Filler, Legend, LineController, LineElement,
  LinearScale, PointElement, Title, Tooltip, registerables
} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @Input() type!: string;
  @ViewChild('dynamicElement') element!: ElementRef;

  constructor() {
    Chart.register(
      BarElement, LinearScale, LineController, PointElement, LineElement, BarController, CategoryScale,
      Decimation, Filler, Legend, Title, Tooltip, LinearScale
    );
  }

  ngOnInit(): void { }

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
      default:
        console.error('questo grafico non è presente');
        break;
    }
  }

  private buildChart(ctx: ChartItem, typeChar: any) {
    new Chart(ctx, {
      type: typeChar,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2],
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
