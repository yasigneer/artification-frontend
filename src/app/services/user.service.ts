import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = environment.apiUrl+'Users';
  constructor(protected http: HttpClient) { }

  getUser(nickname: string): Observable<User> {
    return this.http.get<User>(this.apiUrl+'/'+nickname);
  }
}
