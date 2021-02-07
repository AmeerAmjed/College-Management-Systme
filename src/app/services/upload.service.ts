import { Injectable } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';;
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

// import { UploadModel } from './upload';
import * as firebase from 'firebase'
import { retry } from 'rxjs/operators';
import UIkit from 'uikit'


@Injectable({
  providedIn: 'root'
})
export class UploadService {
  [x: string]: any;
  ref = firebase.storage().ref('excel');
  post = []
  pdfC1 = [];
  pdfC2 = [];
  con
  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFireStorage) {
  }



  addPost(nameTech, stage, img, title, body) {
    console.log('addPdf' + ' title:' + title + ' body:' + body + ' stage:' + stage + img)
    this.db.list(`item/${stage}/post`).push({
      teacher: nameTech,
      img: img,
      stage: stage,
      data: new Date().valueOf(),
      body: body,
      title: title,
    }).then(() => {
      UIkit.notification({ message: 'Success Upload Post ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    })

  }
  addPostAdmin(title, body, status) {
    this.db.list(`item/admin/post`).push({
      status: status,
      data: new Date().valueOf(),
      body: body,
      title: title,
    }).then(() => {
      UIkit.notification({ message: 'Success Upload Post ', pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    })

  }
  
  addPdf(nameTech, stage, nameSubject, course, Theoretical, Practical, linkprogram, nameprogram) {
    this.db.list(`item/stage4/pdf`).push({
      nameTech: nameTech,
      stage: stage,
      nameSubject: nameSubject,
      course: course,
      Theoretical: Theoretical,
      Practical: Practical,
      linkprogram: linkprogram,
      nameprogram: nameprogram
    }).then(() => {
      UIkit.modal("#modal-pdf").hide();
      UIkit.notification({ message: `Success Update PDF ${course} `, pos: 'bottom-left', status: 'success', timeout: 2000 });
    }).catch(error => {
      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 2000 });
    })
  }


  addTopStudent(nameStudent, level, average) {
    this.db.object(`item/topStudent/${level}`).set({
      nameStudent: nameStudent,
      level: level,
      average: average
    }).then(
      () => {
        UIkit.notification({ message: `Success Add Top Student `, pos: 'bottom-left', status: 'success', timeout: 1000 });
      }
    ).catch(error => {
      UIkit.notification({ message: error, pos: 'bottom-left', status: 'danger', timeout: 10000 });
    });


  }

  uploadFile(file) {
    return new Promise((resolve) => {

      this.ref.put(file).then(function (snapshot) {
        let downloadurl = snapshot.downloadURL;
        firebase.database().ref('excelimport').child('newexcel').set({
          thaturl: downloadurl
        }).then(() => {

          console.log('uploaded');


        })


      });
      // setTimeout(() => {
      //         this.firestorethis().then(() => {
      //           resolve();
      //         }) 
      //       }, 60000);  
      // console.log(resolve())
    })


  }










}
