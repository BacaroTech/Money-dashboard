import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { ErrorMessageLabelComponent } from '../error-message-label/error-message-label.component';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, ChartItem, Decimation, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, PieController, PointElement, registerables, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  inputs: ['datas', 'label', 'description', 'type'],
  standalone: true,
  imports: [ErrorMessageLabelComponent],
})
export class DashboardComponent implements OnInit, OnChanges {
  datas!: any[];
  label!: any[];
  description!: string;
  type!: string;
  @ViewChild('dynamicElement', { static: true }) element!: ElementRef<HTMLCanvasElement>;

  errorMessage: string = '';
  private chartInstance?: Chart;

  constructor() {
    Chart.register(
      BarElement,
      LinearScale,
      LineController,
      PointElement,
      LineElement,
      BarController,
      CategoryScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      DoughnutController,
      ArcElement,
      PieController
    );
  }

  ngOnInit(): void {
    // Se i dati sono già presenti al primo caricamento, disegna subito il grafico
    if (this.datas.length && this.label.length) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas'] || changes['label']) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    const canvas = this.element?.nativeElement;
    console.log(canvas)

    if (!canvas) {
      this.errorMessage = 'Elemento canvas non trovato';
      console.error(this.errorMessage);
      return;
    }

    const ctx = canvas as ChartItem;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    let chartType: 'bar' | 'pie';
    switch (this.type) {
      case 'patrimonio':
        chartType = 'pie';
        break;
      case 'rapporto':
        chartType = 'bar';
        break;
      default:
        this.errorMessage = `Tipo di grafico "${this.type}" non supportato`;
        console.error(this.errorMessage);
        return;
    }

    this.chartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels: this.label,
        datasets: [
          {
            label: this.description,
            data: this.datas,
            borderWidth: 1,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      }
    });
  }
}