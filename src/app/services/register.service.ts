import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl=  `${environment.apiUrl}/Register`
  constructor(protected httpClient: HttpClient) { }
  register(user: User){
    return this.httpClient.post(this.apiUrl,user).pipe(first())
  }
}
