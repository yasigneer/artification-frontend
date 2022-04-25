import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, tap} from "rxjs/operators";
import {Observable} from "rxjs";

import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl+'Login'
  isLoggedIn$?: Observable<boolean>;
  currentUser$?: Observable<User>;

  constructor(protected http: HttpClient,protected userService: UserService) {}

  login(loginUser:User){
    return  this.http.post(this.apiUrl,loginUser).pipe(
      tap((response: any) => {
        this.isLoggedIn$ = response;
        if(this.isLoggedIn$){
          this.currentUser$ = this.userService.getUser(loginUser.nickName).pipe(
            filter(users => users.nickName == loginUser.nickName),
            tap((user:any )=> console.log(user))
          );
          this.currentUser$.subscribe(data => console.log(data));
        }
      }),
    );
  }
}
