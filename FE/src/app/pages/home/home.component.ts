import { Component, inject, OnInit } from '@angular/core';
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [DashboardComponent, ErrorMessageLabelComponent, LoaderComponent, CommonModule]
})
export class HomeComponent implements OnInit {

  datasBilancioValue: Number[] = [];
  datasBilancioLabelX: String[] = [];
  datasFlowValue: number[] = [];
  datasFlowLabelX: String[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  currentUser!: User;

  private user: ProfileProviderService = inject(ProfileProviderService);
  private userLog: UserLogService = inject(UserLogService);

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    const uuid = this.userLog.getUuidUser();
    this.user.getUser(uuid).
    subscribe(
      {
        next: (user: User) => {
          this.currentUser = user;
          this.isLoading = false;
          this.isError = false;
        }, 
        error: (err) => {
          console.log("Si è verificato un errore, riprovare: ", err);
          this.isLoading = false;
          this.isError = true;
        }
      }
    )
  }
}
