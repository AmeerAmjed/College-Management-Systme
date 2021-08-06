import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { userAdmin, userStudent, userTeacher } from '../model/user';
import { environment } from './../../environments/environment';
import { throwError, Observable, Observer, pipe } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { AngularFireStorageReference } from '@angular/fire/storage/ref';

import UIkit from 'uikit'
import firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  private apiUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'responseType': 'text'
      // 'Content-Type': 'application/json'
    })
  }

  constructor(
    private http: HttpClient,
    public Firestore: AngularFirestore,
    private FireStorage: AngularFireStorage,
  ) { }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error: ', error.error.message)
    } else {
      console.error("Error From Server: " + error.status + " error was: " + error.error)
    }

    return throwError('Server Error')
  }

  infoUser(email: string): Observable<any> {
    return this.Firestore.collection('users').doc(email).valueChanges();
  }
  updateLinKFace(link: string) {
    this.Firestore.collection('users').doc(firebase.auth().currentUser.email).update({ facebook: link });
  }
  updateDescription(Description: string) {
    this.Firestore.collection('users').doc(firebase.auth().currentUser.email).update({ description: Description });
  }
  updateUrlImage(url: string) {
    this.Firestore.collection('users').doc(firebase.auth().currentUser.email).update({ img: url });
  }
  addAdmin(data) {
    return this.http.post<userAdmin>(this.apiUrl + 'addAdmin', data, { responseType: 'text' as 'json' })
      .pipe(retry(2), catchError(this.handleError)).subscribe(
        response => {
          let res = String(response)
          if (res === '200') {
            UIkit.notification({ message: 'Success add User', pos: 'top-center', status: 'success' });
          } else {
            console.log(res + JSON.stringify(data))
            // UIkit.notification({ message: 'The email address is already in use by another account.', pos: 'top-center', status: 'danger' });
          }
        });
  }


  addTeacher(data) {
    return this.http.post<userTeacher>(this.apiUrl + 'addTeacher', data, { responseType: 'text' as 'json' })
      .pipe(retry(2), catchError(this.handleError)).subscribe(
        response => {
          let res = String(response)
          if (res === '200') {
            UIkit.notification({ message: 'Success add User', pos: 'top-center', status: 'success' });
          } else {
            console.log(res + JSON.stringify(data))

            // UIkit.notification({ message: 'The email address is already in use by another account.', pos: 'top-center', status: 'danger', timeout: 1000000000 });
          }
        });
  }


  addStudent(data) {
    return this.http.post<userStudent>(this.apiUrl + 'addStudent', data, { responseType: 'text' as 'json' })
      .pipe(retry(2), catchError(this.handleError)).subscribe(
        response => {
          let res = String(response)
          if (res === '200') {
            UIkit.notification({ message: 'Success add User', pos: 'top-center', status: 'success' });
          } else {
            UIkit.notification({ message: 'The email address is already in use by another account.', pos: 'top-center', status: 'danger' });
          }
        });
  }




  addPost(nameTech, stage, image, title, body) {
    const key = this.Firestore.createId();
    return this.Firestore.collection('post').doc(key).set({
      $key: key,
      teacher: nameTech,
      stage: stage,
      data: new Date().valueOf(),
      body: body,
      image: image,
      title: title,
      status: "private"
    });
  }
  getPost(): Observable<any> {
    return this.Firestore.collection('post').valueChanges();
  }

  deletePost($key:string) {
    return this.Firestore.collection('post').doc($key).delete();
  }


}
