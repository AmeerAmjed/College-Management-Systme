import { tokenName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Route,
} from '@angular/router';
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SetpasswordGuard implements CanActivate {
  constructor(
    // private AuthService :AuthService,
    public route: ActivatedRoute
  ) {}


  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {

const emailVerified = firebase.auth().currentUser.emailVerified;
const refreshToken = firebase.auth().currentUser.refreshToken;

      if(!firebase.auth().currentUser.emailVerified ){}
      console.log(emailVerified,refreshToken)

         return resolve(true);
      // .then(user => {
      //   this.router.navigate(['/user']);
      //   return resolve(false);
      // }, err => {
      //   return resolve(true);
      // })
    })
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   // const newUser = sessionStorage.getItem('newUser');
  //   var dataUrl: Object;
  //   var token :String ;

  //   return this.route.queryParams.subscribe( (params) => {
  //     token =  params['token'];
  //     return true;
  //     console.log('i' + JSON.stringify(params['token']));
  //   });
  //   console.log(token)
  //   // this.route.fragment.subscribe( map => {console.log("f"+JSON.stringify(map))});

    
  // }
}
