import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { ProfileProviderService } from 'src/app/provider/profile.provider';
import { UserLogService } from 'src/app/services/user-log.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ErrorMessageLabelComponent } from "src/app/components/error-message-label/error-message-label.component";
import { LoaderComponent } from "src/app/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendResponce } from 'src/app/model/responce';

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
  errorMessage: string = "";

  private router: Router = inject(Router);
  public utils: UtilsService = inject(UtilsService);
  private profileProvider: ProfileProviderService = inject(ProfileProviderService);
  private userLogService: UserLogService = inject(UserLogService);

  constructor() { }

  goToLogin() {
    this.isLoading = true;
    this.isError = false;
    this.profileProvider.loginUser(this.loginCredenzial)
    .subscribe(
      {
        next: (backendResponce: BackendResponce<string>) => {
          const uuid:string = backendResponce.content!;
          this.userLogService.setUuidUser(uuid);
          console.log(backendResponce.message, backendResponce.content);
          this.router.navigateByUrl('dashboard');
          this.isError = false;
          this.isLoading = false;
        }, 
        error: (err: BackendResponce<string>) => {
          this.badApiCall(err);
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

  private badApiCall(err: BackendResponce<any>){
    this.errorMessage = err.message;
    console.error(this.errorMessage, err);
    this.isError = true;
    this.isLoading = false;
  }
}
