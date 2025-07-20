import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ModalComponent implements OnInit {

  @Input()
  title: string = "";

  @Input()
  text: string = "";

  @Input()
  type: "error" | "info" | "warning" | "success" | "" = "";

  isOpenModal: boolean = true;
  mapColor: Map<string, string> = new Map([
    ["error", "red"],
    ["info", "blue"],
    ["warning", "yellow"],
    ["success", "green"]
  ]);

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  close() {
    this.isOpenModal = false;
  }

  getBackgroundClass(): string {
    const color = this.mapColor.get(this.type) || 'gray';
    return `bg-${color}-100`;
  }

  getIconClass(): string {
    const color = this.mapColor.get(this.type) || 'gray';
    return `text-${color}-600`;
  }
}
