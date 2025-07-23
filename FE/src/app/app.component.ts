import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { ReadSettingService } from './services/read-setting.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MenuComponent, RouterOutlet, CommonModule]
})
export class AppComponent implements OnInit {
  title: string = 'Money Dashboard';
  href: string = ""; 
  private showMenu: boolean = true;
  hideMenu: string[] = ["/login", "/register", "/404"];

  private router: Router = inject(Router);
  private readSettingService: ReadSettingService = inject(ReadSettingService);

  constructor(){ }
  
  async ngOnInit() {
    await this.readSettingService.loadConfig();
    this.href = this.router.url;
    this.showMenu = this.isToBeShowMenu();
  }

  isToBeShowMenu(): boolean {
    return !this.hideMenu.includes(this.href);
  }

  getShowMenu(): boolean {
    return this.showMenu;
  }

  setShowMenu(newState: boolean): void {
    this.showMenu = newState;
  }
}
