import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  loadingData: Boolean = true;

  adminUser: number;
  teacherUser: number;
  studentUser: number;
  studentUserStage1: number;
  studentUserStage2: number;
  studentUserStage3: number;
  studentUserStage4: number;
  graduateUser: number;
  
  constructor(
    private DashboardService: DashboardService,
    public Firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    await this.DashboardService.getCountUsers()
      .then(
        async datas => {
          this.adminUser = datas['countAdminUser'];
          this.teacherUser = datas['countTeacherUser'];
          this.studentUser = datas['countStudentUser'];
          this.studentUserStage1 = datas['countStudentUserStage1'];
          this.studentUserStage2 = datas['countStudentUserStage2'];
          this.studentUserStage3 = datas['countStudentUserStage3'];
          this.studentUserStage4 = datas['countStudentUserStage4'];
          this.loadingData = false;
        }
      );
  }

}
