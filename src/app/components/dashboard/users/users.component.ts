import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
import { Observable } from 'rxjs';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  // inputs: ['inMobile'],

})



export class UsersComponent implements OnInit {
  adminUser;
  studentUser;
  teacherUser;

  formadduser: FormGroup;
  formUpdate: FormGroup;
  loadingData: Boolean = false;

  num = [];
  stg: Boolean = true;
  scientifictitle: Boolean = true;
  itemArray = [];
  user
  ads
  key = [];
  inMobile
  // data: Array<any[]> = [];
  f = "student";
  st1;
  data = [];
  // role: Array<any> = ["admin", "teacher", "student"];
  admin: Array<any>

  //  inMobile: boolean; 
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

    // const res =  this.datas.filter(user => user.roles ==='ROLE_ADMIN');

    console.log(this.key)
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
      stage: ['', Validators.required]
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
    this.DashboardService.getAllUsers().subscribe(
      data => {
        this.data = data
        // console.log(this.data);



        this.adminUser = this.data.filter(user => user.role === Role.admin);
        this.teacherUser = this.data.filter(user => user.role === Role.teacher);
        this.studentUser = this.data.filter(user => user.role === Role.student);

        console.log("adminUser" + this.adminUser);
        console.log("teacherUser" + this.teacherUser);
        console.log("studentUser" + this.studentUser);

        // for (const rolee of this.role) {
        //   for (const iterator of this.data) {
        //     if (iterator["role"] == rolee) {
        //       // if(rolee ==  )
        //       this.admin.push(iterator)
        //       console.log(rolee + "sssss" + iterator["email"])
        //       console.log(this.admin)

        //     }
        //   }
        // }
      }
    )
    // return this.n = this.DashboardService.getAllUsers.length

    // console.log(this.adminUser);

  }


  updateUser() {
    // const displayName = this.formUpdate.controls['fullName'].value
    // const stage = this.formUpdate.controls['stage'].value;

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

  async onDelete(email) {
    var s = confirm(`Are you sure? ${email} delete User !!!`);
    if (s) {
      await this.Firestore.collection('users').doc(email).delete().then(
        () => UIkit.notification({ message: `Success Delete User `, pos: 'bottom-left', status: 'success', timeout: 1000 })
      ).catch(error => UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 }))
    }
    // this.db.list(`users/`).remove($key).then(
    //   () => {
    //     UIkit.notification({ message: `Success Delete User `, pos: 'bottom-left', status: 'success', timeout: 1000 });
    //     this.getUser();
    //   }
    // ).catch(error => {
    //   UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 });
    //   console.error(error);
    // });
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



  moreInfo(email, displayName,role) {
    // this.formUpdate.controls['fullName'].setValue(displayName);
    // this.formUpdate.controls['stage'].setValue(email);

    // this.key = $key;

console.log(email, displayName,role);

    // if (stage == "stage1") {

    //   for (var i = 0; i < this.StudentStage1.length; i++) {
    //     if (this.StudentStage1[i]['$key'] == $key) {
    //       this.formUpdate.controls['fullName'].setValue(this.StudentStage1[i]['displayName']);
    //       this.formUpdate.controls['stage'].setValue(this.StudentStage1[i]['stage']);
    //     }
    //   }

    // } else if (stage == "stage2") {

    //   for (var i = 0; i < this.StudentStage2.length; i++) {
    //     if (this.StudentStage2[i]['$key'] == $key) {
    //       this.formUpdate.controls['fullName'].setValue(this.StudentStage2[i]['displayName']);
    //       this.formUpdate.controls['stage'].setValue(this.StudentStage2[i]['stage']);
    //     }
    //   }

    // } else if (stage == "stage3") {

    //   for (var i = 0; i < this.StudentStage3.length; i++) {
    //     if (this.StudentStage3[i]['$key'] == $key) {
    //       this.formUpdate.controls['fullName'].setValue(this.StudentStage3[i]['displayName']);
    //       this.formUpdate.controls['stage'].setValue(this.StudentStage3[i]['stage']);
    //     }
    //   }

    // } else if (stage == "stage4") {

    //   for (var i = 0; i < this.StudentStage4.length; i++) {
    //     if (this.StudentStage4[i]['$key'] == $key) {
    //       this.formUpdate.controls['fullName'].setValue(this.StudentStage4[i]['displayName']);
    //       this.formUpdate.controls['stage'].setValue(this.StudentStage4[i]['stage']);
    //     }
    //   }

    // }

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
    return this.key.indexOf($key) > -1
  }

}

enum Role {
  admin = "admin",
  teacher = "teacher",
  student = "student"
}

enum Student {
  stage1 = "stage1",
  stage2 = "stage2",
  stage3 = "stage3",
  stage4 = "stage4"
}