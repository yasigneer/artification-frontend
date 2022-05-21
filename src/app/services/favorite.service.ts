import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";
import {FavoritePost} from "../models/favorite-post.model";
import {Post} from "../models/post.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl: string = `${environment.apiUrl}/Likes`
  constructor(protected httpClient: HttpClient) { }
  addToFavorites (favoritePost: FavoritePost) {
   return this.httpClient.post(this.apiUrl, favoritePost);
  }
  getPostsFavorites (postId: number) : Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/PostLike/${postId}`);
  }
  getUsersFavorites (userId: number) : Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiUrl}/UserLike/${userId}`);
  }
}
