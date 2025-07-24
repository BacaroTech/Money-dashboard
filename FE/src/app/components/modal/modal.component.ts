import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  inputs: ['title', 'text', 'type', 'action']
})
export class ModalComponent implements OnInit {

  title!: string;
  text!: string;
  type!: "error" | "info" | "warning" | "success";
  action!: Function;

  isOpenModal: boolean = true;
  mapColor: Map<string, string> = new Map([
    ["error", "red"],
    ["info", "blue"],
    ["warning", "yellow"],
    ["success", "green"]
  ]);

  constructor() { }

  ngOnInit(): void {

  }

  close() {
    this.isOpenModal = false;
  }

  getBackgroundClass(): string {
    const color = this.mapColor.get(this.type);
    return `bg-${color}-600 hover:bg-${color}-400`;
  }

  execute() {
    this.action();
  }
}
