import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {Post} from "../models/post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL: string = `${environment.apiUrl}Posts`
  constructor(protected httpClient: HttpClient) { }

  getPosts(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.apiURL);
  }
  sharePost(formData: FormData){
    return this.httpClient.post(this.apiURL,formData)
  }
}
