import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor(
    private AuthService :AuthService,
    public router:Router
    ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return  this.AuthService.loginStatus().then(user =>{
        console.log(user)

        if (user ) {
        console.log("realy login")
      this.router.navigate(['/home'])
      return false
        } else {

          // console.log("false"+false)

          return true;
  
        }
      })
  }
  
}
