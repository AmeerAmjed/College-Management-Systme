import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
// import { firebase } from '@firebase/app'
// import '@firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    
    const expectedRole = route.data.role;
    const userRole = this.authService.userRole();

    return this.authService.loginStatus().then(user => {

      // console.log("userRoleG"+userRole,expectedRole ,userRole) 
      
    
      return (user && (expectedRole == userRole)) ?  true :  false ;

      // if (user && (expectedRole == userRole)) { 
      //   // console.log("login it");
      //   return true;
      // } else {
      //   console.log("no  login it");
      //   this.router.navigate(['/login']);
      //   return false;
      // }

    });
  }

}
