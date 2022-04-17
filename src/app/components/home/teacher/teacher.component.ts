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
  userInfo: AngularFireList<any[]>;
  post: AngularFireList<any[]>;
  pdf: AngularFireList<any[]>;
  enabled = true;
  changeDces: Boolean = true;


  emailVerified: boolean = false;

  formaddPdf: FormGroup;
  formaddPost: FormGroup;

  loadImg: Boolean = false;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: String;

  loadTheoretical: Boolean = false;
  fileNameTheoretical: String;
  progsTheoretical: number = 0;
  urlTheoretical: String;

  loadPractical: Boolean = false;
  fileNamePractical: String;
  progsPractical: number = 0;
  urlPractical: String;


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
    this.usersService.getPost().subscribe(posts =>  this.post = posts);
    this.usersService.getPdf().subscribe(pdfs =>  this.pdf = pdfs);
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
    const yes = confirm('Realy you need deleted this post');
    if (yes)
      this.usersService.deletePost($key).then(() => {
        UIkit.notification({ message: 'Post deleted ', pos: 'bottom-left', status: 'success', timeout: 2000 });
      }).catch(error => {
        UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
      });

  }

  upload(event, lectures) {
    lectures == 'Theoreticallectures' ? this.loadTheoretical = true : this.loadPractical = true;
    const file = event.target.files[0];
    
    lectures == 'Theoreticallectures' ? this.fileNameTheoretical = file.name.split('.').pop() : this.fileNamePractical = file.name;
    const id = Math.random().toString(36).substring(2);
    this.ref = this.FireStorage.ref(id);
    this.task = this.ref.put(file);
    this.task.percentageChanges().subscribe(prog => {
      if (lectures == 'Theoreticallectures') {
        this.progsTheoretical = Math.floor(prog);
      } else
        this.progsPractical = Math.floor(prog);
    });
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          if (lectures == 'Theoreticallectures')
            this.urlTheoretical = url
          else
            this.urlPractical = url
        });
      }))
      .subscribe();


  }

  addPdf() {

    const data = JSON.parse(JSON.stringify(this.userInfo));
    const subject =  this.formaddPdf.controls['title'].value  ;
    const course =  this.formaddPdf.controls['course'].value  ;
    const linkprogram = this.formaddPdf.controls['link'].value  ;
    const nameprogram = this.formaddPdf.controls['nameprogram'].value  ;

    this.usersService.addPdf(data.displayName, data.stage,subject,course,this.fileNameTheoretical,this.urlTheoretical , this.fileNamePractical,this.urlPractical,linkprogram,nameprogram).then(() => {
      UIkit.notification({ message: 'Success Upload media PDF ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    });
    this.formaddPdf.reset();
  }


  filters(teacher: String, course: String,statecourse: String) {
    const data = JSON.parse(JSON.stringify(this.userInfo));
    return (teacher == data.displayName) && (statecourse == course);
  }


}
