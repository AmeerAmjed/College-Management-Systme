import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import firebase from 'firebase';
import { userTeacher } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';
import UIkit from 'uikit'
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  loading: Boolean = true;
  public innerWidth: any;
  sli: Boolean = false;
  itemList: AngularFireList<any>
  profileData: AngularFireList<any>
  profile = [];
  userInfo: AngularFireList<any[]>;
  post: AngularFireList<any[]>;
  enabled = true;
  changeDces: Boolean = true;


  spinner = false
  emailVerified: boolean = false;

  formaddPdf: FormGroup;
  formaddPost: FormGroup;

  loadImg: Boolean = false;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: String;
  fileName: String;
  uploadProgress;
  load: Boolean = false;
  uploads: Boolean = false;
  progs
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private _formBuilder: FormBuilder,
    private FireStorage: AngularFireStorage,
  ) {

  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(user => {
      this.usersService.infoUser(user.email).subscribe(data => {
        // this.emailVerified = firebase.auth().currentUser.emailVerified;
        this.emailVerified = true
        this.userInfo = data;
        this.loading = false;
        console.log("data" + data)
      });
    });
    this.usersService.getPost().subscribe(
      posts => {
        this.post = posts;
      }

    )
    this.innerWidth = window.innerWidth;
    window.innerWidth <= 760 ? this.sli = false : this.sli = true;

    this.formaddPost = this._formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    this.formaddPdf = this._formBuilder.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      link: ['', Validators.required],
      nameprogram: ['', Validators.required]
    });

  }



  changeLinkFace(newlink: string, oldlink: string) {
    if (!this.enabled && (newlink != oldlink)) {
      this.usersService.updateLinKFace(newlink);
      UIkit.notification({ message: 'Success Update Link facebook ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }
    this.enabled = !this.enabled;
  }

  changeDescription(newDesc: string, oldDesc: string) {
    if (!this.changeDces && (newDesc != oldDesc)) {
      this.usersService.updateDescription(newDesc);
      UIkit.notification({ message: 'Success Update Description', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }
    this.changeDces = !this.changeDces
  }

  img(event) {
    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.FireStorage.ref(id);
    this.task = this.ref.put(file);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.usersService.updateUrlImage(url);
          this.loadImg = false;
          UIkit.notification({ message: 'Success Update Image Profile ', pos: 'bottom-left', status: 'success', timeout: 2000 })
        });
      })).subscribe();
  }

  addPost() {


    const data = JSON.parse(JSON.stringify(this.userInfo));
    const title = this.formaddPost.controls['title'].value;
    const body = this.formaddPost.controls['body'].value;
    this.usersService.addPost(data.displayName, data.stage, data.img, title, body).then(() => {
      UIkit.notification({ message: 'Success Upload Post ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    });
    this.formaddPost.reset();
  }
  deletePost($key: string) {
    const yes = confirm('realy you need deleted this post');
    if (yes)
      this.usersService.deletePost($key).then(() => {
        UIkit.notification({ message: 'Post deleted ', pos: 'bottom-left', status: 'success', timeout: 2000 });
      }).catch(error => {
        UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
      });

  }


  addPdf() {
    // const nameTech = this.profilea.displayName; 
    // const stage = this.profilea.stage; 
    // const title =  this.formaddPdf.controls['title'].value  ;
    // const course =  this.formaddPdf.controls['course'].value  ;
    // const Theoretical = this.downloadURL;
    // const Practical = this.downloadURL2;
    // const linkprogram = this.formaddPdf.controls['link'].value  ;
    // const nameprogram = this.formaddPdf.controls['nameprogram'].value  ;
    // this.formaddPdf.controls['title'].setValue("");
    // this.formaddPdf.controls['course'].setValue("");
    // this.formaddPdf.controls['link'].setValue("");
    // this.formaddPdf.controls['nameprogram'].setValue("");
    // this.UploadService.addPdf(nameTech,stage,title,course,Theoretical,Practical,linkprogram,nameprogram);
    // this.pdfC1 = [];
    // this.pdfC2 = [];

  }



}
