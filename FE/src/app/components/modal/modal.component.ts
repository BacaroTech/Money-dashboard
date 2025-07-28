import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { IconsSVGService } from 'src/app/services/icons-svg.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  inputs: ['title', 'text', 'type', 'action', 'back']
})
export class ModalComponent implements OnInit {

  title!: string;
  text!: string;
  type!: IconsSVGEnum.error | IconsSVGEnum.info | IconsSVGEnum.warning | IconsSVGEnum.success;
  action!: Function;
  back!: Function;

  isOpenModal: boolean = true;
  mapColor: Map<IconsSVGEnum, string> = new Map([
    [IconsSVGEnum.error, "red"],
    [IconsSVGEnum.info, "blue"],
    [IconsSVGEnum.warning, "yellow"],
    [IconsSVGEnum.success, "green"]
  ]);

  private iconsSVGService: IconsSVGService = inject(IconsSVGService);
  
  modalIconSVG!: string;

  constructor() { }

  ngOnInit(): void {
    this.modalIconSVG = this.iconsSVGService.getMapIcons(this.type)
  }

  close() {
    if(this.back){
      this.back();
    }
    this.isOpenModal = false;
  }

  getBackgroundClass(): string {
    return this.mapColor.get(this.type) + "";
  }

  executeOnClick() {
    this.action();
  }
}
