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
    public route: ActivatedRoute
  ) { }


  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!firebase.auth().currentUser.emailVerified) {
        return resolve(true);
      }
      return resolve(false);
    });
  }

}
