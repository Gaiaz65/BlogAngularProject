/* eslint-disable consistent-return */
/* eslint-disable no-else-return */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(
      private auth:AuthService,
      private router:Router,
  ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     Observable<boolean> 
//     | Promise<boolean> 
//     | boolean 
//     | UrlTree   
//         {
//     if (this.auth.isAuthenticated()) {
//       return true;
//     } else {
//       this.auth.logout();
//       this.router.navigate(['/admin', 'login']);
//       return false
//     }
//   }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ):
       Observable<boolean | UrlTree> 
      | Promise<boolean | UrlTree> 
      | boolean 
      | UrlTree
       
      {
        return this.auth.isAuthenticated()
          .pipe(map((isAuthenticated) => isAuthenticated || this.router.createUrlTree([''])))
      }}

    
