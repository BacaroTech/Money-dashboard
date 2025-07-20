import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ErrorMessageLabelComponent, LoaderComponent, ErrorMessageLabelComponent, CommonModule, FormsModule]
})
export class LoginComponent {
  isLoading: boolean = false;
  isError: boolean = false;
  loginCredenzial: Login = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    public utils: UtilsService,
    private profileProvider: ProfileProviderService,
    private userLogService: UserLogService
  ) {}

  goToLogin() {
    this.profileProvider.loginUser(this.loginCredenzial)
    .subscribe(
      {
        next: (uuid) => {
          this.userLogService.setUuidUser(uuid);
          console.log("Login avvenuto con successo");
          this.router.navigateByUrl('dashboard');
        }, 
        error: (err) => {
          console.error("Si è verirficato un errore durante la login: ", err);
        }
      }
    )
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }

  activeLogin(){
    return(
      this.utils.checkPswHaveCorrectSize(this.loginCredenzial.password) 
      && this.utils.checkMailIsGoodFormated(this.loginCredenzial.email) 
      && this.loginCredenzial.email !== ''
      && this.loginCredenzial.password !== ''
    )
  }
}
