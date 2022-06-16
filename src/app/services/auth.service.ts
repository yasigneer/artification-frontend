import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {CurrentUserService} from "./current-user.service";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiUrl+'/Login';
  constructor(
    protected http: HttpClient,
    protected userService: UserService,
    protected currentUserService: CurrentUserService,
    protected messageService: MessageService
  ) {}

  login(loginUser:User){
    return  this.http.post(this.apiUrl,loginUser).pipe(
      tap((isLoginSucces:any) => {
        if(isLoginSucces) {
          this.userService.getUser(loginUser.nickName).subscribe((user)=>{
            this.currentUserService.setUser(user);
            if(user.profilePhotoPath == null){
              this.messageService.showInfoMessage('Profil sayfasından profil oluşturma işlemini tamamlayabilirsiniz.')
            }
            return user;
          })
        }
      })
    );
  }
  logout(){
    this.currentUserService.removeUser();
  }
}
