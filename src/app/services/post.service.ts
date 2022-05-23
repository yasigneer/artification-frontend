import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  isUpdated$? : BehaviorSubject<boolean>;
  posts$? : Observable<Post[]>
  private apiURL: string = `${environment.apiUrl}/Posts`;
  constructor(protected httpClient: HttpClient) {
    this.isUpdated$ = new BehaviorSubject<boolean>(true);
    this.posts$ = this.isUpdated$.pipe(
      switchMap(()=>this.getPosts())
    );
  }

  getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.apiURL);
  }
  getPostById(postId: number): Observable<Post>{
    return this.httpClient.get<Post>(`${this.apiURL}/${postId}`);
  }
  getUserPosts(userId: number): Observable<Post[]>{
    return this.httpClient.get<Post[]>(`${this.apiURL}/Users/${userId}`);
  }
  sharePost(formData: FormData){
    return this.httpClient.post(this.apiURL,formData).pipe(
      tap(() => {
        this.isUpdated$?.next(true)
      })
    )
  }
}
