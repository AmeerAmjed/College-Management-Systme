import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { firebase } from '@firebase/app'
// import '@firebase/auth'
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import UIkit from 'uikit'
import { Role, Student } from '../model/enum';
import { Post } from '../model/post';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // productsRef: AngularFirestoreCollection<Post>;
  post: Observable<Post[]>;

  teacher = []
  constructor(
    private fbAuth: AngularFireAuth,
    public Firestore: AngularFirestore,

    public router: Router,
  ) {
    this.post = this.Firestore.collection<Post>('post', ref => ref.orderBy("data", "desc")).valueChanges();
    //  this.teacher.push(this.Firestore.collection<any[]>('users', ref => ref.where('role', '==', 'teacher')) ) 
    //  console.log("DashboardService" + JSON.stringify(this.teacher) )
    //  console.log("post" + JSON.stringify( this.post) )
    //  console.log("post" +  this.post) 

  }

  getUsers() {
    return this.Firestore
      .collection("users", ref => ref.orderBy("role", "asc")).valueChanges();
    // .orderBy("role", "asc")

    // .valueChanges();
  }
  //    getData() {
  //     return this.teacher

  // }

  getCountUsers(): Promise<Object> {
    var adminUser,
      teacherUser,
      studentUser,
      studentUserStage1,
      studentUserStage2,
      studentUserStage3,
      studentUserStage4;
    var datauser = []

    return new Promise((resolve, reject) => {
      this.getAllUsers().subscribe(
        async data => {
          datauser = data;
          adminUser = Object.keys(datauser.filter(user => user.role === Role.admin)).length
          teacherUser = Object.keys(datauser.filter(user => user.role === Role.teacher)).length;
          studentUser = Object.keys(datauser.filter(user => user.role === Role.student)).length;
          studentUserStage1 = Object.keys(datauser.filter(user => ((user.role === Role.student) && (user.stage === Student.stage1)))).length;
          studentUserStage2 = Object.keys(datauser.filter(user => ((user.role === Role.student) && (user.stage === Student.stage2)))).length;
          studentUserStage3 = Object.keys(datauser.filter(user => ((user.role === Role.student) && (user.stage === Student.stage3)))).length;
          studentUserStage4 = Object.keys(datauser.filter(user => ((user.role === Role.student) && (user.stage === Student.stage4)))).length;
          resolve({
            "countAdminUser": adminUser,
            "countTeacherUser": teacherUser,
            "countStudentUser": studentUser,
            "countStudentUserStage1": studentUserStage1,
            "countStudentUserStage2": studentUserStage2,
            "countStudentUserStage3": studentUserStage3,
            "countStudentUserStage4": studentUserStage4,
          });
        }
      )
    });

    // return this.Firestore.collection("count").doc("users").valueChanges();
  }

  getAllUsers() {
    // return this.Firestore.collection<any[]>('users').valueChanges().toPromise();
    return this.Firestore.collection<any[]>('users').valueChanges()

  }


  addPostAdmin(title, body, status) {
    let UID = this.Firestore.createId();
    this.Firestore.collection<Post>('post').doc(UID).set({
      $key: UID,
      title: title,
      status: status,
      data: new Date().valueOf(),
      body: body,
    }).then(() => {
      UIkit.notification({ message: 'Success Upload Post ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    })

  }

  getPost(): Observable<any> {
    return this.Firestore.collection<Post>('post', ref => ref.orderBy("data", "desc")).snapshotChanges();
  }
  deletPost($key) {
    this.Firestore.collection<Post>('post').doc($key).delete().then(() => {
      UIkit.notification({ message: 'Success delete Post ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    })


  }

}
