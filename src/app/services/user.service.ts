import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {tap} from "rxjs/operators";
import {CurrentUserService} from "./current-user.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl+'/Users';
  constructor(protected http: HttpClient, protected currentUserService: CurrentUserService) { }

  getUser(nickname: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${nickname}`);
  }
  updateUser(formData: FormData){
    return this.http.post(`${this.apiUrl}/update`,formData).pipe(
      tap(()=>{
        this.getUser(formData.get('nickName')!.toString()).subscribe((user)=> this.currentUserService.setUser(user))
      })
    );
  }
}
