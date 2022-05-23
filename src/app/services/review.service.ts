import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../environments/environment";
import {Review} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/Comments`;
  constructor(protected httpClient: HttpClient) { }
  getCommentsById(postId: number): Observable<Review []> {
    return this.httpClient.get<Review[]>(`${this.apiUrl}/Post/${postId}`);
  }
  makeComment(review: Review) {
    return this.httpClient.post(this.apiUrl, review);
  }
}
