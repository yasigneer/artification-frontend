import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {Review} from "../../models/review.model";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  sub? : Subscription;
  postId?: number;
  post$?: Observable<Post>
  comments$?: Observable<Review[]>
  isChanged$? : BehaviorSubject<Boolean>;
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected postService: PostService,
    protected reviewService: ReviewService) {}

  ngOnInit(): void {
    this.isChanged$ = new BehaviorSubject<Boolean>(true);
    this.sub = this.activatedRoute.paramMap.pipe(
      tap((param)=> {
        this.postId = Number(param.get('postId')!);
        this.post$ = this.postService.getPostById(this.postId);
        this.comments$ = this.isChanged$?.pipe(
          switchMap(()=>this.reviewService.getCommentsById(this.postId!))
        );
      })
    ).subscribe();
    this.isChanged$.subscribe();
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  refreshComments(){
    this.isChanged$?.next(true);
  }
}
