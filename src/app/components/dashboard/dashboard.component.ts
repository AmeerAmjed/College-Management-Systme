import { Component, OnInit,HostListener } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public innerWidth: any;

  sli:Boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth <= 768){
           this.sli = false

    }
    else
        this.sli = true
  }

   constructor(
    private AuthService :AuthService,
    ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
      window.innerWidth <= 760 ? this.sli = false : this.sli = true;

  }
  slid(){
     this.sli = !this.sli
     console.log("SDF"+  this.sli)
   }
  logout(){
    this.AuthService.logout();
  }
    
}
