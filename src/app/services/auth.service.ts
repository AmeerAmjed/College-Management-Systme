import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { Observable } from 'rxjs';
import UIkit from 'uikit'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData;
  role;

  td: String;
  // vairable updatePassword
  actionCodeChecked: boolean;
  actionCode: string;

  constructor(
    private fbAuth: AngularFireAuth,
    public Firestore: AngularFirestore,
    // public setpasswordComponent: SetpasswordComponent,



    public router: Router,
  ) {

  }



  login(email, password, rememberLogin) {

    var stateLogin;

    rememberLogin ? stateLogin = firebase.auth.Auth.Persistence.LOCAL : stateLogin = firebase.auth.Auth.Persistence.SESSION


    firebase.auth().setPersistence(stateLogin).then(
      () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          async user => {
            await this.Firestore.collection<any[]>('users').doc(email).valueChanges().subscribe(async (data) => {
              rememberLogin ? localStorage.setItem('token', await user.user.getIdToken()) : sessionStorage.setItem('token', await user.user.getIdToken())
              this.userData = await user;
              console.log(user.user.providerData)
              // firebase.auth().currentUser.metadata.creationTime === firebase.auth().currentUser.metadata.lastSignInTime
              if (!user.user.emailVerified) {
                // user.user.sendEmailVerification();
                this.router.navigate(['home']);
                // this.router.navigate(['/setpassword'], { queryParams: { token: user.user.refreshToken, id: user.user.uid }, fragment: 'newUser' });
                // this.router.navigate(['home']);

              } else {
                this.router.navigate(['home']);
                //   if (this.userData.role == "admin") {
                //     this.router.navigate(['admin']);
                //   } else {
                //     // this.router.navigate(['home']);
                //     this.router.navigate(['admin']);

                //   }
              }


            })

          }
        ).catch(error => {
          // console.log(error.code);

          switch (error.code) {
            case 'auth/wrong-password':
              UIkit.notification({ message: `The password is invalid.`, status: 'danger', timeout: 5000 });
              break;

            case 'auth/user-not-found':
              UIkit.notification({ message: `Sorry user not found.`, status: 'danger', timeout: 5000 });
              break;

            case 'auth/user-disabled':
              UIkit.notification({ message: `Sorry your user is disabled.`, status: 'danger', timeout: 5000 });
              break;

            case 'auth/user-disabled':
              UIkit.notification({ message: `Sorry your user is disabled.`, status: 'danger', timeout: 5000 });
              break;

            default:
              UIkit.notification({ message: `Login error try again later.`, status: 'danger', timeout: 5000 });
          }


        })

      })
  }


  // isUserLoggedIn() {
  //   jwtHelper = new JwtHelperService();
  //   const token = localStorage.getItem('token');
  //   return token != null && !this.jwtHelper.isTokenExpired(token);
  // }
  // async userRole() {
  //   return await this.userData.role;
  // }

  // infoUser(email: string): Observable<any[]> {
  //   return this.Firestore.collection('users').doc(email).valueChanges().subscribe(
  //     user =>{

  //     }
  //   );
  // }

  userRole() {
    return 'student';
  }

  // infoUser(email: string): Observable<any> {
  //   return this.Firestore.collection('users').doc(email).valueChanges();
  // }

  // userRole(): Promise<string> {
  //   return new Promise((resolve) => {
  //     const email = firebase.auth().currentUser.email;
  //     this.infoUser(email).subscribe(
  //       user => resolve(user.role)
  //     );
  //   });
  // }

  forgetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => UIkit.notification({ message: `Send email to reset password!  `, status: 'success', timeout: 5000 }))
      .catch(() => UIkit.notification({ message: `This is email not recorder or may have been deleted.`, status: 'danger', timeout: 5000 }));
  }

  async loginStatus(): Promise<boolean> {
    const tLOCAL = localStorage.getItem('token');
    const tSESSION = sessionStorage.getItem('token');

    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    })
  }

  updatePassword(setPassword: string): Observable<any> {

    firebase.auth().currentUser.updatePassword(setPassword).then(
      () => {
        // this.db.object(`users/${newUser}`).valueChanges().subscribe((data)=>{
        if (this.userData.role == "admin") {
          localStorage.setItem('td', `${this.td}`);

          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['home'])

        }
        UIkit.notification({ message: `Success set Password  `, status: 'success', timeout: 5000 });

        // })
      }

    ).catch(error => {

      UIkit.notification({ message: `${error}`, status: 'danger', timeout: 5000 })
    })


    console.log("Success set Password" + setPassword)
    return;
  }

  updatePassword3(setPassword): Promise<boolean> {
    return new Promise((resolve) => {
      firebase.auth().currentUser.updatePassword(setPassword).then(
        () => {
          UIkit.notification({ message: `Success set Password  `, status: 'success', timeout: 5000 });

        }

      ).catch(error => {
        resolve(false);
        UIkit.notification({ message: `${error}`, status: 'danger', timeout: 5000 });
      })
    })
  }



  errorInput() {
    UIkit.notification({ message: `Error in input please try agin`, status: 'danger', timeout: 5000 })
  }


  async logout() {
    // await localStorage.removeItem('t');
    // await localStorage.removeItem('td');
    // await sessionStorage.removeItem('t');
    await localStorage.clear();
    await sessionStorage.clear();

    // localStorage.removeItem('user');
    // this.loggedIn = false;

    this.fbAuth.signOut().then(() => {
      this.router.navigate(['']);
      console.log('signOut');
    }).catch((error) => console.error(error));
  }


}
