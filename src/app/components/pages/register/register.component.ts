import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SignUpInfo } from '../../../services/auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  signupInfo: SignUpInfo | undefined;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder) { 
    this.registerForm = fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required, Validators.maxLength(18)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submitted');

    this.signupInfo = new SignUpInfo(
      this.loginFromForm?.value,
      this.passwordFromForm?.value
    );

    console.log(this.signupInfo);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = true;
      }, 
      error => {
        console.log('error');
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  get loginFromForm() {
    return this.registerForm.get('login');
  }

  get passwordFromForm() {
    return this.registerForm.get('password');
  }

}
