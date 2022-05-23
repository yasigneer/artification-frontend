import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";

import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {Review} from "../../models/review.model";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  sub? : Subscription;
  postId?: number;
  post$?: Observable<Post>
  comments$?: Observable<Review[]>
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected postService: PostService,
    protected reviewService: ReviewService) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.pipe(
      tap((param)=> {
        this.postId = Number(param.get('postId')!);
        this.post$ = this.postService.getPostById(this.postId);
        this.comments$ = this.reviewService.getCommentsById(this.postId);
      })
    ).subscribe()
  }

}
