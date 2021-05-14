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
  userInfo: AngularFireObject<Object>;
  // userInfo: Observable<[]>
  // userInfo: any;
  sli: Boolean = false;
  loading: Boolean = true;
  profilea: Observable<Object>;
  formaddPdf: FormGroup;
  formaddPost: FormGroup;


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: String;
  fileName: String;
  uploadProgress;
  load: Boolean = false;
  uploads: Boolean = false;
  progs

  downloadURL2: String;
  fileName2: String;
  uploadProgress2;
  load2: Boolean = false;
  uploadss2: Boolean = false;
  progs2
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

  // data = {
  //   displayName: '',
  //   email:'',
  //   img: '',
  //   lastLogin: '',
  //   role:  '',
  //   stage: ''
  //  } 
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
      this.usersService.infoUser(user.email).subscribe(data => this.userInfo = data);
    })
  }

  ngOnInit(): void {
    this.loading = false;
    this.innerWidth = window.innerWidth;
    window.innerWidth <= 760 ? this.sli = false : this.sli = true;







    this.formaddPost = this._formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    })

    this.formaddPdf = this._formBuilder.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      link: ['', Validators.required],
      nameprogram: ['', Validators.required]
    })

  }
  slid() {
    this.sli = !this.sli
    console.log("SDF" + this.sli)
  }


  // addPost(){
  //   const nameTech = this.profilea.displayName; 
  //   const stage = this.profilea.stage; 
  //   const img = this.profilea.img; 
  //   const title = this.formaddPost.controls['title'].value  ;
  //   const body = this.formaddPost.controls['body'].value  ;
  //   this.UploadService.addPost(nameTech,stage,img,title,body);
  //   this.formaddPost.controls['title'].setValue("");
  //   this.formaddPost.controls['body'].setValue("");
  //   // this.post = [];
  // }

  // addPdf(){
  //   const nameTech = this.profilea.displayName; 
  //   const stage = this.profilea.stage; 
  //   const title =  this.formaddPdf.controls['title'].value  ;
  //   const course =  this.formaddPdf.controls['course'].value  ;
  //   const Theoretical = this.downloadURL;
  //   const Practical = this.downloadURL2;
  //   const linkprogram = this.formaddPdf.controls['link'].value  ;
  //   const nameprogram = this.formaddPdf.controls['nameprogram'].value  ;
  //   this.formaddPdf.controls['title'].setValue("");
  //   this.formaddPdf.controls['course'].setValue("");
  //   this.formaddPdf.controls['link'].setValue("");
  //   this.formaddPdf.controls['nameprogram'].setValue("");
  //   this.UploadService.addPdf(nameTech,stage,title,course,Theoretical,Practical,linkprogram,nameprogram);
  //   this.pdfC1 = [];
  //   this.pdfC2 = [];

  //   }
  logout() {
    this.authService.logout();
  }



}
