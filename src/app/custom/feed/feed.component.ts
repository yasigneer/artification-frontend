import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";

import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {CurrentUserService} from "../../services/current-user.service";
import {User} from "../../models/user.model";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {
  newestPosts$!: Observable<Post[]>;
  followingPosts$!: Observable<Post[]>;
  topRatedPosts$!: Observable<Post[]>;
  currentUser$?: Observable<User>
  constructor(
    protected postService: PostService,
    protected currentUserService: CurrentUserService
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.currentUserService.currentUser$;
    this.followingPosts$ = this.currentUser$!.pipe(
      switchMap((user)=> this.postService.getFollowingsPosts(user.userId!))
    );
    this.newestPosts$ = this.postService.posts$!;
    this.topRatedPosts$ = this.postService.getTopRatedPosts();
  }

}
