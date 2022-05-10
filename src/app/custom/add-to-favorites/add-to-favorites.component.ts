import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

import {User} from "../../models/user.model";
import {FavoriteService} from "../../services/favorite.service";
import {AuthService} from "../../services/auth.service";
import {FavoritePost} from "../../models/favorite-post.model";
import {Post} from "../../models/post.model";
import {map, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {
  @Input() post?: Post;
  @Input() context?: string;
  likeCount?: number;
  currentUserID?: number;
  favoritePost?: FavoritePost;
  constructor(protected favoriteService: FavoriteService, protected authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$?.subscribe((user: User) => this.currentUserID = user.userId!);
    this.favoritePost = this.setFavoritePost;
    this.likeCount = this.post?.likeCount;
  }
  get setFavoritePost(): FavoritePost{
    return {
      postId: this.post?.postId!,
      userId: this.currentUserID!
    }
  }
  addFavorites(){
    console.log(this.favoritePost);
    this.favoriteService.addToFavorites(this.favoritePost!).subscribe(()=>{
        this.favoriteService.getPostsFavorites(this.post?.postId!).subscribe((users)=> this.likeCount = users.length)
      }
    );
  }
}
