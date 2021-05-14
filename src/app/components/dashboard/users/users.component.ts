import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef } from '@angular/core';

import { DashboardService } from 'src/app/services/dashboard.service';
import { UsersService } from '../../../services/users.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import UIkit from 'uikit'
// import { Observable } from 'rxjs/internal/Observable';
// import { userAdmin, userStudent } from './../../../services/user/users';
// import { HomeComponent } from './../home.component';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';
import { map, switchMap } from 'rxjs/operators';
import { Role, Student } from 'src/app/model/enum';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})



export class UsersComponent implements OnInit {
  adminUser;
  studentUser;

  studentUserStage1: any;
  studentUserStage2: any;
  studentUserStage3: any;
  studentUserStage4: any;

  teacherUser;

  formadduser: FormGroup;
  formUpdate: FormGroup;
  loadingData: Boolean = true;

  num = [];
  stg: Boolean = true;
  scientifictitle: Boolean = true;
  itemArray = [];
  user
  ads
  key = [];
  inMobile
  // data: Array<any[]> = [];
  st1;
  data = [];
  admin: Array<any>
  private options: number[] = [1, 2, 3, 4];
  userInfo

  constructor(
    private DashboardService: DashboardService,
    public myapp: AppComponent,
    public Firestore: AngularFirestore,
    private _formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    private UsersService: UsersService,
    public router: Router

  ) {
    this.inMobile = this.myapp.onResize();
    console.log("inMobile" + this.myapp.onResize());
    this.getAllUsers()
    // const res =  this.datas.filter(user => user.roles ==='ROLE_ADMIN');

    console.log(this.key.length)
  }

  ngOnDestroy() {
    console.log("inMobileUpdate" + this.myapp.onResize());

  }
  ngOnInit() {
    // this.ngOnChanges();
    this.getAllUsers();
    this.formadduser = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      rule: ['', Validators.required],
      stage: ['', Validators.required],
    });
    this.formUpdate = this._formBuilder.group({
      fullName: ['', Validators.required],
      stage: ['', Validators.required],
      role: ['', Validators.required]
    });

  }
  // ngOnChanges() { // <- it will run every time and give you the latest value of fieldType
  //   console.log("inMobile"+this.myapp.inMobile);
  // }

  onChange($event) {
    // console.log("event"+$event)
    let rules = (<HTMLInputElement>event.target).value
    if (rules === 'admin') {
      this.stg = true;
      this.scientifictitle = true;
      this.formadduser.removeControl('stage');
      this.formadduser.removeControl('scientifictitleTeach');
    } else if (rules === 'teacher') {
      this.stg = false;
      this.scientifictitle = false;
      this.formadduser.addControl('stage', new FormControl('', Validators.required));
      this.formadduser.addControl('scientifictitleTeach', new FormControl('', Validators.required));
    } else {
      this.stg = false;
      this.scientifictitle = true;
      this.formadduser.addControl('stage', new FormControl('', Validators.required));
    }
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.DashboardService.getAllUsers().subscribe(
        async data => {
          this.data = await data
          this.adminUser = this.data.filter(user => user.role === Role.admin);
          this.teacherUser = this.data.filter(user => user.role === Role.teacher);
          this.studentUser = this.data.filter(user => user.role === Role.student);
          this.studentUserStage1 = this.data.filter(user => ((user.role === Role.student) && (user.stage === Student.stage1)));
          this.studentUserStage2 = this.data.filter(user => ((user.role === Role.student) && (user.stage === Student.stage2)));
          this.studentUserStage3 = this.data.filter(user => ((user.role === Role.student) && (user.stage === Student.stage3)));
          this.studentUserStage4 = this.data.filter(user => ((user.role === Role.student) && (user.stage === Student.stage4)));
          this.loadingData = false;

          resolve(data);

        }
      )

    });


  }

  check(da): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAllUsers().then(
        checked => {
          console.log(checked)
          da != null && da != undefined ? resolve(true) : reject(false)
        }
      )
      // console.log('f1');
      // resolve();
    });


  }

  updateUser() {
    const displayName = this.formUpdate.controls['fullName'].value
    const stage = this.formUpdate.controls['stage'].value;
console.log(displayName,stage,"sssss")
    // this.db.object(`users/${this.key}`).update({ stage: stage, displayName: displayName }).then(
    //   () => {
    //     UIkit.notification({ message: `Success Update User `, pos: 'bottom-left', status: 'success', timeout: 1000 });
    //     this.getUser();
    //   }
    // ).catch(error => {
    //   UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 });
    //   console.error(error);
    // });


  }

  con() {

    var s = confirm('Are you sure?');
    console.log("ok" + s)
    if (s) {
      console.log("ok")
    }
  }

  async deleteUser(email) {
    var s = confirm(`Are you sure? ${email} delete User !!!`);
    if (s) {
      await this.Firestore.collection('users').doc(email).delete().then(
        () => UIkit.notification({ message: `Success Delete User `, pos: 'bottom-left', status: 'success', timeout: 1000 })
      ).catch(error => UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 }))
    }
  }

  async deleteListUser() {
    var listUser = confirm(`Are you sure? \nDelete ${this.key.length} Users !!!`);
    if (listUser) {
      for (const user of this.key) {
        await this.Firestore.collection('users').doc(user).delete().then(
          () => UIkit.notification({ message: `Success Delete all Users `, pos: 'bottom-left', status: 'success', timeout: 1000 })
        ).catch(error => UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 }));
      }
    }
  }


  //   async adduser(){
  //     const fullName = this.formadduser.controls['fullName'].value;
  //     const email = this.formadduser.controls['email'].value;
  //     const password = '123456789';
  //     const rule = this.formadduser.controls['rule'].value;
  //       var data = {
  //         displayName :fullName,
  //           email :email,
  //           password:password,
  //           role:rule
  //         }
  //         let httpOptions ={
  //             headers : new HttpHeaders({
  //               'Content-Type': 'application/json',
  //               'Accept':'application/json'
  //             })
  //           }
  //           await this.http.post('https://us-central1-uowcos.cloudfunctions.net/addAdmin', data,httpOptions);
  // }


  adduser() {
    const fullName = this.formadduser.controls['fullName'].value;
    const email = this.formadduser.controls['email'].value;
    const password = '123456789';
    const role = this.formadduser.controls['rule'].value;

    if (role === "admin") {
      const data = {
        displayName: fullName,
        email: email,
        password: password,
        role: role
      }
      this.UsersService.addAdmin(data);

    } else if (role === "teacher") {

      const Teachstage = this.formadduser.controls['stage'].value;
      const careerTitle = this.formadduser.controls['scientifictitleTeach'].value;

      const data = {
        displayName: fullName,
        email: email,
        password: password,
        role: role,
        Teachstage: Teachstage,
        careerTitle: careerTitle
      }
      this.UsersService.addTeacher(data);
    } else if (role === "student") {
      const stage = this.formadduser.controls['stage'].value;
      let data = {
        displayName: fullName,
        email: email,
        password: password,
        role: role,
        stage: stage
      }
      this.UsersService.addStudent(data);

    }
  }


  // async getHeroes(): Promise<Observable<usersStudents[]>> {
  //   return await this.http.get<usersStudents[]>('https://us-central1-uowcos.cloudfunctions.net/getUsers');
  // }
  // getStudyprogram(): Observable<{}> {
  //   return  this.Firestore.collection<Studyprogram>('....').doc('....').valueChanges();
  // }



  moreInfo(email, displayName, role) {
    this.formUpdate.controls['fullName'].setValue(displayName);
    this.formUpdate.controls['stage'].setValue(email);
    this.formUpdate.controls['role'].setValue(role);


    console.log(email, displayName, role);


  }
  moreInfoStudent(email, displayName, role, stage) {

    this.formUpdate.controls['fullName'].setValue(displayName);
    this.formUpdate.controls['stage'].setValue(stage);
    this.formUpdate.controls['role'].setValue(role);
    console.log(email, displayName, role, stage+"this.formUpdate.get('role').value00"+this.formUpdate.get('role').value);


  }




  // To add & delete user from array [Key ] 
  listkey($key, event) {
    // Get event checkbox
    var Event = event.target.checked
    // console.log(event.target.checked);
    if (Event == true) {
      // ADD $keyUser to key array
      this.key.push($key)
    } else {
      // Remove $keyUser from key array
      this.key.splice(this.key.indexOf($key), 1)
      //  console.log("delete-------" +$key)
    }
  }

  // To check user in array [Key ] 
  isInArray($key): Boolean {
    console.log(this.key.length == 0)
    return this.key.indexOf($key) > -1
  }

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  uncheckAll(message) {
    var confirmAction = confirm(message);
    if (confirmAction == true) {
      this.checkboxes.forEach((element) => {
        console.log(element)
        element.nativeElement.checked = false;
      });
      this.key = [];
    }
  }
  changeDir() {
    if (this.key.length != 0)
      this.uncheckAll(`Really need change Dir will Remove select ${this.key.length} users now!`);
  }

}

