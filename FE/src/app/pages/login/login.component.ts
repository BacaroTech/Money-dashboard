import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/loginCredenzial';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginCredenzial: Login = {
    mail: '',
    psw: ''
  };

  constructor(
    private router: Router,
    public utils: UtilsService
  ) {}

  goToLogin() {
    // A questo punto il form è già validato da Angular Template-driven
    this.router.navigateByUrl('dashboard');
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }

  activeLogin(){
    return(
      this.utils.checkPswHaveCorrectSize(this.loginCredenzial.psw) 
      && this.utils.checkMailIsGoodFormated(this.loginCredenzial.mail) 
      && this.loginCredenzial.mail !== ''
      && this.loginCredenzial.psw !== ''
  
    )
  }
}
