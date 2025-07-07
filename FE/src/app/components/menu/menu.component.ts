import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false
})
export class MenuComponent implements OnInit {

  menus: Array<{ name: string, url: string, active: boolean, icon: string }> = [
    {
      name: 'Home',
      url: '/dashboard',
      active: true,
      icon: `
      <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 10L10.5 1 20 10"></path>
        <path d="M4 10v7h5v-5h2v5h5v-7"></path>
      </svg>`
    },
    {
      name: 'Aggiungi operazione',
      url: '/addFlow',
      active: false,
      icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14"></path>
      </svg>`
    },
    {
      name: 'Analisi',
      url: '/review',
      active: false,
      icon: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>`
    }
  ];


  isSidebarOpen = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

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

    this.menus = [
      {
        name: 'Home',
        url: '/dashboard',
        active: true,
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 10L10.5 1 20 10"></path>
          <path d="M4 10v7h5v-5h2v5h5v-7"></path>
        </svg>`) as string
      },
      {
        name: 'Aggiungi operazione',
        url: '/addFlow',
        active: false,
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"></path>
        </svg>`) as string
      },
      {
        name: 'Analisi',
        url: '/review',
        active: false,
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>`) as string
      }
    ];

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goActive(url: string) {
    this.setActive(url);
  }

  setHome() {
    this.setActive('/dashboard');
  }

  openLeftMenu() {
    document.getElementById("default-sidebar")?.classList.remove("-translate-x-full");
    document.getElementById("background")?.classList.add("-z-10");
  }

  closeLeftMenu() {
    document.getElementById("default-sidebar")?.classList.add("-translate-x-full");
    document.getElementById("background")?.classList.remove("-z-10");
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
