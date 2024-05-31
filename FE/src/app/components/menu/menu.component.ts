import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  active: string = "";

  menus: Array<{ "name": string, "url": string, "active": boolean }> = [
    { "name": "Home", "url": "/dashboard", "active": true },
    { "name": "Aggiungi flusso", "url": "/addFlow", "active": false }
  ]

  constructor() { }

  ngOnInit(): void {
    this.menus.forEach(voice => {
      if (voice.url == this.active) {
        voice.active = true;
      } else {
        voice.active = false;
      }
    })
  }

}
