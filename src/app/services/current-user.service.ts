import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public userSubject$?: BehaviorSubject<User>
  public currentUser$?: Observable<User>
  constructor() {
    this.userSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser$ = this.userSubject$.asObservable();
  }
  setUser(user: User){
    localStorage.setItem('currentUser',JSON.stringify(user));
    this.userSubject$?.next(user);
  }
  removeUser(){
    localStorage.removeItem('currentUser');
    this.userSubject$?.next(null!);
  }
}
