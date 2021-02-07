import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/internal/operators'
import { DashboardService } from 'src/app/services/dashboard.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  loadingData:Boolean = true  ;
  count;
  constructor(
    private DashboardService: DashboardService,
    public Firestore: AngularFirestore,

  ) { 
    // this.date()
    // this.Firestore.collection<any[]>('users', ref => ref.where('role', '==', 'teacher')).valueChanges()
    // .subscribe( result => {
    // console.log(result);
    // }) 

  }

  ngOnInit(): void {
    // this.loadingData = false  ;
    // this.getData();
  }

  getData() {
    this.DashboardService.getCountUsers()
    .subscribe(async result => {
      console.log(result);
     this.count=  result
      // this.items = result;
      // this.age_filtered_items = result;
      // this.name_filtered_items = result;
    })
  }
// async date(){
//   await 
//   console.log(this.DashboardService.getData().values)
// }
}
