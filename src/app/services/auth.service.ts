

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
const baseUrl= "http://localhost:3000/api"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private http:HttpClient) { }

  public createUser(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.http.post(`${baseUrl}/auth/signup`,
        {email: email, password: password}).subscribe(
        (response) => {
            resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getAllUsers() {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/auth/users`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  public login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.http.post(`${baseUrl}/auth/signin`, {
        email: email, password: password }).subscribe(
        (authData: { token: string, userId: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            this.isAuth$.next(true);
            resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = "";
    this.token = "";
  }
}
