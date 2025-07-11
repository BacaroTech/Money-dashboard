import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { ReadSettingService } from './services/read-setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {
  title: string = 'My Money Dashboard';
  href: string = ""; 
  private showMenu = true;
  hideMenu: string[] = [
    "/login", "/register", "/404"
  ];

  constructor(
    private router: Router,
    private readSettingService: ReadSettingService
  ){ }
  
  async ngOnInit() {
    await this.readSettingService.loadConfig();
    this.href = this.router.url;
    this.showMenu = this.isToBeShowMenu();
  }

  isToBeShowMenu(): boolean{
    return !this.hideMenu.includes(this.href);
  }

  getShowMenu(): boolean{
    return this.showMenu;
  }

  setShowMenu(newState: boolean): void{
    this.showMenu = newState;
  }
}
