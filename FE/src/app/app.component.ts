import { Component, OnInit } from '@angular/core';
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
  title = 'My Money Dashboard';
  href = ""; 
  private showMenu = true;
  hideMenu: string[] = ["/login", "/register", "/404"];

  constructor(
    private router: Router,
    private readSettingService: ReadSettingService
  ){ }
  
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
