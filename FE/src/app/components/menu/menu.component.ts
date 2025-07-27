import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { filter, map } from 'rxjs';
import { IconsSVGEnum } from 'src/app/enum/IconsSVGEnum';
import { IconsSVGService } from 'src/app/services/icons-svg.service';

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
  private iconsSVGService: IconsSVGService = inject(IconsSVGService);

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
      icon: this.iconsSVGService.getMapIcons(IconsSVGEnum.home)
    },
    {
      name: 'Aggiungi operazione',
      url: '/addOperation',
      active: false,
      icon: this.iconsSVGService.getMapIcons(IconsSVGEnum.plus)
    },
    {
      name: 'Revisione dei conti',
      url: '/review',
      active: false,
      icon: this.iconsSVGService.getMapIcons(IconsSVGEnum.checkbox)
    },
    {
      name: 'Profilo',
      url: '/profile',
      active: false,
      icon: this.iconsSVGService.getMapIcons(IconsSVGEnum.profile)
    },
    {
      name: 'Logout',
      url: '/logout',
      active: false,
      icon: this.iconsSVGService.getMapIcons(IconsSVGEnum.exit)
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
