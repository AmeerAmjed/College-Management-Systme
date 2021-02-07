import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { firebase } from '@firebase/app'
// import '@firebase/auth'
import { Observable } from 'rxjs';
import UIkit from 'uikit'
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
   this.post= this.Firestore.collection<Post>('post', ref => ref.orderBy("data", "desc")).valueChanges();
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

  getCountUsers() {
    return this.Firestore.collection("count").doc("users").valueChanges();
  }

  getAllUsers() {
    // return this.Firestore.collection<any[]>('users').valueChanges().toPromise();
    return this.Firestore.collection<any[]>('users').valueChanges()

  }


  addPostAdmin(title,body,status){
     this.Firestore.collection<Post>('post').add({
      title:title,
      status:status,
      data : new Date().valueOf(),
      body:body ,
     }).then(()=>{
      UIkit.notification({message: 'Success Upload Post ', pos: 'bottom-left',status:'success',timeout :2000});
    }).catch(error=>{
      UIkit.notification({message: `${error}`, status: 'danger',timeout :2000}); 
    })
  
  }




}
