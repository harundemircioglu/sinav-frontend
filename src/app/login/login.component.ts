import { Component, OnInit } from '@angular/core';
import { LoginRequest } from 'src/core/models/request/login-request.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { AuthService } from 'src/core/services/auth/auth.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { User } from 'src/core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  loginRequset: LoginRequest = <LoginRequest>{};
  registerRequset: RegisterRequest = <RegisterRequest>{};
  currentUser: User | null = null;

  async login() {
    const status = await this.authService.login(this.loginRequset);

    if (status == ResponseStatus.Ok) {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
        if (this.currentUser?.userType === 0) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
    } else {
      console.log("Kullanıcı adı veya şifre hatalı")
    }

  }

  async register() {
    const status = await this.authService.register(this.registerRequset);

    if (status == ResponseStatus.Ok) {
      this.authService.currentUser.subscribe(user => {
        this.router.navigate(['/home']);
      })
    } else {
      console.log("Üyelik işlemi başarısız")
    }
  }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp') as HTMLElement | null;
    const signInButton = document.getElementById('signIn') as HTMLElement | null;
    const container = document.getElementById('container') as HTMLElement | null;

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
    });
  }
}
