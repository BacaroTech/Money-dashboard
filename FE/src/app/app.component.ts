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
  hideMenu: string[] = ["/login", "/register", "/404"];

  private router: Router = inject(Router);
  private readSettingService: ReadSettingService = inject(ReadSettingService);

  constructor(){ }
  
  async ngOnInit() {
    await this.readSettingService.loadConfig();
  }

  isToBeShowMenu(): boolean {
    return !this.hideMenu.includes(this.router.url);
  }
}
