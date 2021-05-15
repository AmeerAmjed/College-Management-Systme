import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DashboardService } from '../../../services/dashboard.service';
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

  loadingData: Boolean = true;
  // postAdmin = [];

  // post: Observable<Post[]>;
  post
  dateYear = new Date().getFullYear()

  constructor(
    private _formBuilder: FormBuilder,
    public db: AngularFireDatabase,
    private DashboardService: DashboardService
  ) {
    this.DashboardService.post.subscribe(data => this.post = data);
    this.loadingData = false;
    this.DashboardService.getPost().subscribe(data => console.log(data));
  }

  ngOnInit(): void {
    this.getData();
    this.formaddPost = this._formBuilder.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      body: ['', Validators.required],
    });
    this.formaddToStudent = this._formBuilder.group({
      nameStudent: ['', Validators.required],
      level: ['', Validators.required],
      average: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required],
    });
  }

  async getData() {
    await this.DashboardService.getTopStudent();
    

  }

  addTopStudent() {
    const nameStudent = this.formaddToStudent.controls['nameStudent'].value;
    const level = this.formaddToStudent.controls['level'].value;
    const average = this.formaddToStudent.controls['average'].value;
    const startYear = this.formaddToStudent.controls['startYear'].value;
    const endYear = this.formaddToStudent.controls['endYear'].value;
    this.DashboardService.addTopStudent(nameStudent, level, average, startYear, endYear);
    UIkit.modal("#modal-topStudent").hide();
    this.formaddToStudent.reset();

  }

  getTopStudent() {


  }

  addPost() {
    const title = this.formaddPost.controls['title'].value;
    const status = this.formaddPost.controls['status'].value;
    const body = this.formaddPost.controls['body'].value;
    console.log(title, status, body);
    UIkit.modal("#modal-post").hide();
    this.DashboardService.addPostAdmin(title, body, status);
    this.formaddPost.controls['title'].setValue("");
    this.formaddPost.controls['body'].setValue("");

  }

  deletePost($key) {
    let conform = confirm("really need delete post ?")
    conform ? this.DashboardService.deletPost($key) : null;
  }

  number(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

}
