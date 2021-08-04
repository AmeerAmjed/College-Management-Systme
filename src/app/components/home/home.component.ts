import { Component, OnInit, HostListener } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import UIkit from 'uikit'
import { finalize, map, switchMap } from 'rxjs/operators';
import { userTeacher } from 'src/app/model/user';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public innerWidth: any;
  userInfo: any;
  sli: Boolean = false;
  loading: Boolean = true;




  pdfC1 = [];
  pdfC2 = [];
  tech = [];
  submitted: Boolean;

  itemList: AngularFireList<any>
  profileData: AngularFireList<any>
  profile = [];

  emailVerified: Boolean = false;
  num2
  post = []
  status: boolean = false;
  stage
  buttonUpload: Boolean = true;
  loadImg: Boolean = false;

  enabled = true;
  spinner = false
  dce = true
  postAdmin
  toTop: Boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      this.sli = false;
    }
    else {
      this.sli = true;
    }

  }

  @HostListener('window:keyup', ['$event'])
  keyEventUp(event: KeyboardEvent) {

    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  isHovered: HTMLElement;
  constructor(
    private authService: AuthService,
    public Firestore: AngularFirestore,

    private usersService: UsersService,
    private _formBuilder: FormBuilder,) {
    firebase.auth().onAuthStateChanged(user => {
      this.usersService.infoUser(user.email).subscribe(data => {
        this.userInfo = data;
        console.log("data" + data)
      });
    })
  }

  ngOnInit(): void {
    this.loading = false;
    this.innerWidth = window.innerWidth;
    window.innerWidth <= 760 ? this.sli = false : this.sli = true;









  }
  slid() {
    this.sli = !this.sli
    console.log("SDF" + this.sli)
  }



  logout() {
    this.authService.logout();
  }



}
