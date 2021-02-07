import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { userAdmin, userStudent, userTeacher } from '../model/user';
import { environment } from './../../environments/environment';
import { throwError, Observable, Observer, pipe } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import UIkit from 'uikit'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
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





}
