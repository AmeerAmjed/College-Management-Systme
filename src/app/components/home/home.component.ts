import { Component, OnInit, HostListener } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { firebase } from '@firebase/app'
import '@firebase/auth'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public innerWidth: any;
  // userInfo: Observable<Object>;
  userInfo:any;
  sli: Boolean = false;
  loading: Boolean = true;
  profilea : Observable<Object>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 768) {
      this.sli = false

    }
    else
      this.sli = true
  }
  constructor(
    private authService: AuthService,
    public Firestore: AngularFirestore,

    private usersService: UsersService) {

  }

  ngOnInit(): void {
    this.loading = false;
    this.innerWidth = window.innerWidth;
    window.innerWidth <= 760 ? this.sli = false : this.sli = true;

    firebase.auth().onAuthStateChanged(user => {
      this.Firestore.collection('users').doc(user.email).valueChanges().subscribe(
        data => {
          this.userInfo = data;

          console.log( data+"dsa");
        }
      )
    });

  }
  slid() {
    this.sli = !this.sli
    console.log("SDF" + this.sli)
  }
  logout() {
    this.authService.logout();
  }

}
