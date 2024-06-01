import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Array<{ "name": string, "url": string, "active": boolean }> = [
    { "name": "Home", "url": "/dashboard", "active": true },
    { "name": "Aggiungi flusso", "url": "/addFlow", "active": false }
  ]

  constructor() { }

  ngOnInit(): void { }

  goActive(url: string){
    this.menus.forEach(voice => {
      if (voice.url == url) {
        voice.active = true;
      } else {
        voice.active = false;
      }
    })
  }

  setHome(){
    this.menus.forEach(voice => {
      if (voice.url == '/dashboard') {
        voice.active = true;
      } else {
        voice.active = false;
      }
    })
  }

}
