import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Array<{"name": string, "url": string, "active": boolean }> = [
    {"name":"Dashboard", "url":"dashboard", "active":true},
    {"name":"Page2", "url":"Page2", "active":false}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
