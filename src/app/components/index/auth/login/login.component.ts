import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Formlogin: FormGroup;
  FormForgetPassword: FormGroup;

  isActive: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Formlogin = this._formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(30),
        Validators.minLength(6)])
      ],
      password: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6)])
      ],
      rememberLogin: [null]
    });

    this.FormForgetPassword = this._formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.maxLength(30),
        Validators.minLength(6)])
      ]
    });
  }

  eye() {
    this.isActive = !this.isActive;
  }



  login(Formlogin: any) {

    const email = Formlogin.email;
    const password = Formlogin.password;
    const rememberLogin = Formlogin.rememberLogin;

    this.Formlogin.valid ? this._authService.login(email, password, rememberLogin) : this._authService.errorInput();

  }

  forgetPassword(email: string) {
    
    this.Formlogin.valid ? this._authService.forgetPassword(email) : this._authService.errorInput();
  }


}
