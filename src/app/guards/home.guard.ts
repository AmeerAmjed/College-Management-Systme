import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private AuthService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const suserData = localStorage.getItem('td');
    if ((suserData && suserData.length > 30)) {
      this.router.navigate(['/admin'])
      return false;
    }


    return this.AuthService.loginStatus().then(user => {
      if (!user) {
        console.log("no  login it")
        this.router.navigate(['/login'])
        return false;

      } else {

        return true;

      }
    })

  }
}
