import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class MenuComponent implements OnInit {

  isSidebarOpen: boolean = false;
  activeRoute!: string;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  readonly menus: Array<{
    name: string;
    url: string;
    active: boolean;
    icon: string;
  }> = [
    {
      name: 'Home',
      url: '/dashboard',
      active: true,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 10L10.5 1 20 10"></path>
          <path d="M4 10v7h5v-5h2v5h5v-7"></path>
        </svg>
      `) as string
    },
    {
      name: 'Aggiungi operazione',
      url: '/addOperation',
      active: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
      `) as string
    },
    {
      name: 'Analisi',
      url: '/review',
      active: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      `) as string
    },
    {
      name: 'Profilo',
      url: '/profile',
      active: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth=2 stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      `) as string
    },
    {
      name: 'Logout',
      url: '/logout',
      active: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      `) as string
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map(route => route.url)
    ).subscribe((segments: any) => {
      const path = '/' + segments?._value?.[0]?.path;
      if (path) this.setActive(path);
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openLeftMenu(): void {
    document.getElementById("default-sidebar")?.classList.remove("-translate-x-full");
    document.getElementById("background")?.classList.add("-z-10");
  }

  closeLeftMenu(): void {
    document.getElementById("default-sidebar")?.classList.add("-translate-x-full");
    document.getElementById("background")?.classList.remove("-z-10");
  }

  private setActive(url: string): void {
    this.menus.forEach(menu => {
      menu.active = (menu.url === url);
    });
  }
}
