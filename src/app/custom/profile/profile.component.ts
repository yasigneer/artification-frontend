import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {PostService} from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";
import {Post} from "../../models/post.model";
import {FavoriteService} from "../../services/favorite.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit ,OnDestroy{
  sub? : Subscription;
  user$? : Observable<User>;
  sharedPosts$! : Observable<Post[]>;
  favoritedPosts$! : Observable<Post[]>;
  nickname?: string;
  isShared = true;
  constructor(
    protected postService: PostService,
    protected userService: UserService,
    protected authService: AuthService,
    protected favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.pipe(
      tap((param) => {
        this.nickname = param.get('nickname')!;
        this.user$ = this.getUser(this.nickname).pipe(
          tap((user)=>{
            this.sharedPosts$ = this.getSharedPosts(user.userId!);
            this.favoritedPosts$ = this.getFavoritedPosts(user.userId!)
          })
        )
      }),
    ).subscribe();
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
  getFavoritedPosts(id:number):Observable<Post[]>{
    return this.favoriteService.getUsersFavorites(id);
  }
  changeList() {
    this.isShared = !this.isShared;
  }
}
