import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ErrorMessageLabelComponent } from '../error-message-label/error-message-label.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  inputs: ['datas', 'labels', 'type'], // Cambiato 'label' in 'labels'
  standalone: true,
  imports: [ErrorMessageLabelComponent],
})
export class DashboardComponent implements OnInit, OnChanges {
  datas!: number[]; // Specificato il tipo
  labels!: string[]; // Specificato il tipo
  type!: string;
  
  @ViewChild('dynamicElement', { static: true }) element!: ElementRef<HTMLCanvasElement>;
  
  readonly colors: string[] = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 205, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
  ];

  readonly borderColors: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];

  errorMessage: string = '';
  private chartInstance?: Chart;

  constructor() {
    // Registra tutti i componenti di Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log('ngOnInit - datas:', this.datas, 'labels:', this.labels, 'type:', this.type);
    
    // Verifica che i dati siano validi prima di renderizzare
    if (this.isDataValid()) {
      setTimeout(() => this.renderChart(), 0); // Usa setTimeout per assicurarsi che il DOM sia pronto
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['datas'] || changes['labels'] || changes['type']) && this.isDataValid()) {
      // Piccolo delay per assicurarsi che tutti i cambiamenti siano applicati
      setTimeout(() => this.renderChart(), 0);
    }
  }

  private isDataValid(): boolean {
    if (!this.datas || !this.labels || !this.type) {
      this.errorMessage = 'Dati mancanti: datas, labels o type non definiti';
      console.warn(this.errorMessage);
      return false;
    }

    if (!Array.isArray(this.datas) || !Array.isArray(this.labels)) {
      this.errorMessage = 'Datas e labels devono essere array';
      console.error(this.errorMessage);
      return false;
    }

    if (this.datas.length === 0 || this.labels.length === 0) {
      this.errorMessage = 'Array datas e labels non possono essere vuoti';
      console.warn(this.errorMessage);
      return false;
    }

    if (this.datas.length !== this.labels.length) {
      this.errorMessage = `Lunghezza array non corrispondente: datas(${this.datas.length}) vs labels(${this.labels.length})`;
      console.error(this.errorMessage);
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  private renderChart(): void {
    const canvas = this.element?.nativeElement;

    if (!canvas) {
      this.errorMessage = 'Elemento canvas non trovato';
      console.error(this.errorMessage);
      return;
    }

    // Distruggi il grafico precedente se esiste
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = undefined;
    }

    let chartType: 'bar' | 'pie' | 'doughnut' | 'line';
    switch (this.type.toLowerCase()) {
      case 'patrimonio':
        chartType = 'bar';
        break;
      default:
        this.errorMessage = `Tipo di grafico "${this.type}" non supportato. Tipi supportati: patrimonio, bar, pie, doughnut, line`;
        console.error(this.errorMessage);
        return;
    }

    try {
      this.chartInstance = new Chart(canvas, {
        type: chartType,
        data: {
          labels: this.labels,
          datasets: this.createDataset(chartType),
        },
        options: this.getChartOptions(chartType)
      });

      console.log('Grafico creato con successo:', this.chartInstance);
    } catch (error) {
      this.errorMessage = `Errore nella creazione del grafico: ${error}`;
      console.error(this.errorMessage, error);
    }
  }

  private createDataset(chartType: string): any[] {
    console.log('Creating dataset for type:', chartType, 'with data:', this.datas);

    switch (chartType) {
      case 'bar':
        return [{
          label: 'I miei conti',
          data: this.datas,
          backgroundColor: this.colors.slice(0, this.datas.length),
          borderColor: this.borderColors.slice(0, this.datas.length),
          borderWidth: 2
        }];

      default:
        console.error('Tipo di grafico non supportato:', chartType);
        return [];
    }
  }

  private getChartOptions(chartType: string): any {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const
        },
        tooltip: {
          enabled: true
        }
      }
    };

    // Aggiungi scale solo per grafici che le supportano
    if (chartType === 'bar') {
      return {
        ...baseOptions,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Categorie'
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valori'
            }
          }
        }
      };
    }

    return baseOptions;
  }
}