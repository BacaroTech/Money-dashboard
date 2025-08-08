import { Component, EventEmitter, inject } from '@angular/core';
import { IconsSVGService } from 'src/app/services/icons-svg.service';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  inputs: ['totalPages'],
  outputs: ['loadNewElements']
})
export class PaginatorComponent {
  totalPages?: number;
  currentPage: number = 1;
  loadNewElements: EventEmitter<number> = new EventEmitter<number>();
  iconsSVGService: IconsSVGService = inject(IconsSVGService);
  IconsSVGEnum = IconsSVGEnum;

  loadNewElementsFunction(index: number) {
    this.currentPage = index;
    this.emitCurrentPage();
  }

  modifyCurrentPage(pageToModify: 1 | -1) {
    this.currentPage += pageToModify;
    this.emitCurrentPage();
  }

  createArrayFromPages(): number[] {
    return Array.from({ length: this.totalPages! }, (_, i) => i + 1);
  }

  private emitCurrentPage() {
    this.loadNewElements.emit(this.currentPage);
  }
}
