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
  showMenu = true;

  constructor(
    private router: Router,
    private readSettingService: ReadSettingService
  ){ }
  
  async ngOnInit() {
    await this.readSettingService.loadConfig();

    this.router.events.subscribe(() => {
      this.href = this.router.url;
      //console.log(this.href)
      if(this.isShowMenu()){
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    });
  }

  isShowMenu(){
    return this.href === '/login';
  }
}
