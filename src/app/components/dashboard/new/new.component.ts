import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';


// import { UploadService, posterAdmin } from 'src/app/services/upload/upload.service';
import { AngularFireDatabase } from '@angular/fire/database';
import UIkit from 'uikit'
import { Post } from 'src/app/model/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  formaddPost: FormGroup;
  formaddToStudent: FormGroup;

  loadingData:Boolean = true;
  // postAdmin = [];

  // post: Observable<Post[]>;
  post


 constructor(
   private _formBuilder: FormBuilder,
   public db :AngularFireDatabase,
   private DashboardService:DashboardService
  //  private UploadService:UploadService
   ) { 
 this.DashboardService.post.subscribe( data => this.post = data);
// console.log(JSON.stringify(this.post));
    // this.db.list(`item/admin/post`).snapshotChanges().subscribe(actions=>{
    //   actions.forEach(action=>{          
    //     let y = action.payload.toJSON()
    //     y["$key"] = action.key
    //       this.postAdmin.push(y as posterAdmin)
    //       this.postAdmin.reverse()

    //     })
    //     this.loadingData =  false
    //     })
  }

  ngOnInit(): void {
    this.formaddPost = this._formBuilder.group({
      title: ['',Validators.required] ,
      status : ['',Validators.required] ,
      body : ['',Validators.required] ,
    });
    this.formaddToStudent = this._formBuilder.group({
      nameStudent: ['',Validators.required] ,
      level : ['',Validators.required] ,
      average : ['',Validators.required] ,
    });
  }


  addTopStudent(){
    // const nameStudent = this.formaddToStudent.controls['nameStudent'].value  ;
    // const level = this.formaddToStudent.controls['level'].value  ;
    // const average = this.formaddToStudent.controls['average'].value  ;
    // console.log(nameStudent+level+average)
    // this.UploadService.addTopStudent(nameStudent,level,average);
    // UIkit.modal("#modal-topStudent").hide(); 
    // this.formaddToStudent.controls['nameStudent'].setValue("");
    // this.formaddToStudent.controls['level'].setValue("");
    // this.formaddToStudent.controls['average'].setValue("");

  }
  addPost(){
    const title = this.formaddPost.controls['title'].value  ;
    const status = this.formaddPost.controls['status'].value  ;
    const body = this.formaddPost.controls['body'].value  ;
    console.log(title,status,body);

    this.DashboardService.addPostAdmin(title,body,status);






    // UIkit.modal("#modal-post").hide(); 
    // this.UploadService.addPostAdmin(title,body,status);
    // this.formaddPost.controls['title'].setValue("");
    // this.formaddPost.controls['body'].setValue("");
    // this.postAdmin = [];
  }
  
  deletePost($key){
    // this.db.list(`item/admin/post`).remove($key)
    // this.postAdmin = []
  }
}
