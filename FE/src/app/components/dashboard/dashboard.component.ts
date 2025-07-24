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
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  inputs: ['datas', 'label', 'description', 'type'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  datas!: any[];
  label!: any[];
  description!: string;
  type!: string;
  @ViewChild('dynamicElement') element!: ElementRef;

  constructor() {
    Chart.register(
      BarElement, LinearScale, LineController, PointElement, LineElement, BarController, CategoryScale,
      Decimation, Filler, Legend, Title, Tooltip, LinearScale, DoughnutController, ArcElement
    );
  }

  ngOnInit(): void {
    
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
        this.buildChart(ctx, 'bar');
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
          borderWidth: 1,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
        }]
      },
      options: {
        responsive: true,
        options: { }
      }
    });
  }
}
