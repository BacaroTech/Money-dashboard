import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menus: Array<{ "name": string, "url": string, "active": boolean }> = [
    { "name": "Home", "url": "/dashboard", "active": true },
    { "name": "Aggiungi flusso", "url": "/addFlow", "active": false },
    { "name": "Revisione", "url": "/review", "active": false }
  ]

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => route.url)
    ).subscribe((e: any) => this.setActive('/' + e._value[0].path))
  }

  goActive(url: string) {
    this.setActive(url);
  }

  setHome() {
    this.setActive('/dashboard');
  }

  private setActive(url: string) {
    this.menus.forEach(voice => {
      if (voice.url == url) {
        voice.active = true;
      } else {
        voice.active = false;
      }
    })
  }

}
