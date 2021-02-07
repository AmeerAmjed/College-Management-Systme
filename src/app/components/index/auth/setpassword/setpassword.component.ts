import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {

  public isActive: boolean = true;
  public loading: boolean = false;
  FormSetPassword: FormGroup;

  constructor(
    private location: LocationStrategy,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
  ) {
    //disable button back is browser
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
      alert("Can't back please set Password");
    });
  }

  ngOnInit(): void {
    this.FormSetPassword = this._formBuilder.group({
      password: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6)])
      ],
      confirmPassword: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6)])
      ],
    }, { validator: this.checkPasswords }
    )
  }

  checkPasswords(group: FormGroup) {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { 'mismatch': true }
  }

  eye() {
    this.isActive = !this.isActive;
  }

  updatePassword(password: string) {
    this.loading = true;
    if (this.FormSetPassword.valid) {
      this._authService.updatePassword3(password).
        then(() => this.loading = false).
        catch(() => this.loading = false)
    } else
      this._authService.errorInput();
  }

}
