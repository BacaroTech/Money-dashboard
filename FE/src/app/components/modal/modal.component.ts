import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: false
})
export class ModalComponent implements OnInit {

  @Input()
  title: string = "";

  @Input()
  text: string = "";

  isOpenModal: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.isOpenModal = false;
  }

}
