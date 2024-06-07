import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  title: string = "";

  @Input()
  text: string = "";

  @Input()
  redirect: string = "";

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  closeAndRedirect() {
    document.getElementById('myModal')?.classList.add('hidden');
    this.router.navigate([this.redirect]);
  }

}
