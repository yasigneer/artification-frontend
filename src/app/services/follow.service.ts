import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {Follower} from "../models/follower.model";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private apiUrl = environment.apiUrl
  constructor(
    protected http: HttpClient
  ) { }
  follow(follow: Follower){
    return this.http.post(`${this.apiUrl}/Follows`, follow)
  }
  getFollowers(userId: number): Observable<Follower[]>{
    return this.http.get<Follower[]>(`${this.apiUrl}/Follower/${userId}`);
  }
  getFollowings(userId: number): Observable<Follower[]>{
    return this.http.get<Follower[]>(`${this.apiUrl}/Following/${userId}`);
  }
}
