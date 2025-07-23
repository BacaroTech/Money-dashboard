import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogService } from 'src/app/services/user-log.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  private userLog: UserLogService = inject(UserLogService);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.userLog.clearUuidUser();
    this.router.navigateByUrl("/login");
  }
  
}
