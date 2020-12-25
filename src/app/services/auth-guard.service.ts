import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";
import {observable, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | UrlTree {
    return new Observable((observer) => {
      this.auth.isAuth$.subscribe(
        (auth) => {
          if (!auth){
            this.router.navigate(['/auth/signin']);
          }
          observer.next(true);
        }
      );
    });

  }
}
