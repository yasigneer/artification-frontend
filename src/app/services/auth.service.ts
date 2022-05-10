import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl+'/Login';
  private userSubject$?: BehaviorSubject<User>
  public currentUser$?: Observable<User>
  constructor(
    protected http: HttpClient,protected userService: UserService) {
    this.userSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser$ = this.userSubject$.asObservable();
  }

  login(loginUser:User){
    return  this.http.post(this.apiUrl,loginUser).pipe(
      tap((isLoginSucces:any) => {
        if(isLoginSucces) {
          this.userService.getUser(loginUser.nickName).subscribe((user)=>{
            localStorage.setItem('currentUser',JSON.stringify(user));
            this.userSubject$?.next(user);
            return user;
          })
        }
      })
    );
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.userSubject$?.next(null!);
  }
}
