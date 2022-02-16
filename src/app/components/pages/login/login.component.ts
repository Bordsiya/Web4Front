import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthLoginInfo } from '../../../services/auth/login-info';
import { TokenStorageService } from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(18)]],
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    console.log('form submit');

    this.loginInfo = new AuthLoginInfo(
      this.loginFromForm?.value,
      this.passwordFromForm?.value
    );

    console.log(this.loginInfo);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        console.log('response');
        console.log(data.token);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveLogin(this.loginFromForm?.value);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        //this.reloadPage();
      },
      error => {
        console.log('error');
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  get loginFromForm() {
    return this.loginForm.get('login');
  }

  get passwordFromForm() {
    return this.loginForm.get('password');
  }

}
