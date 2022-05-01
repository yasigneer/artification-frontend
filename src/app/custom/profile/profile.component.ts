import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";

import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit ,OnDestroy{
  sub? : Subscription;
  user$? : Observable<User>;
  sharedPosts$! : Observable<Post[]>;
  nickname?: string
  constructor(
    protected postService: PostService,
    protected userService: UserService,
    protected authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe( (params) =>
      this.nickname = params.get('nickname')!
    );
    this.user$ = this.getUser(this.nickname!);
    this.sharedPosts$ = this.user$?.pipe(switchMap((user)=>
    this.getSharedPosts(user.userId!)
      )
    );
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  getUser(nickname:string): Observable<User>{
    return this.userService.getUser(nickname);
  }
  getSharedPosts(id:number):Observable<Post[]>{
    return this.postService.getUserPosts(id);
  }
}
