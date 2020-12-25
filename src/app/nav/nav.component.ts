import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  private isAuthSub: Subscription;
  constructor(private auth: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.isAuthSub =  this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/auth/signin']);

  }
  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

}
