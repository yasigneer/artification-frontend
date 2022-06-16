import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";

import {User} from "../../models/user.model";
import {FavoriteService} from "../../services/favorite.service";
import {FavoritePost} from "../../models/favorite-post.model";
import {Post} from "../../models/post.model";
import {CurrentUserService} from "../../services/current-user.service";
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-add-to-favorites',
  templateUrl: './add-to-favorites.component.html',
  styleUrls: ['./add-to-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToFavoritesComponent implements OnInit {
  @Input() post?: Post;
  @Input() context?: string;

  likeCount?: number;
  currentUserID?: number;
  favoritePost?: FavoritePost;
  isFavorited$?: Observable<boolean>;
  constructor(
    protected favoriteService: FavoriteService,
    protected currentUserService: CurrentUserService,
    protected messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.currentUserService.currentUser$?.subscribe((user: User) => this.currentUserID = user.userId!);
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
    this.favoriteService.addToFavorites(this.favoritePost!).subscribe(()=>{
        this.favoriteService.getPostsFavorites(this.post?.postId!).
        subscribe(()=> this.messageService.showSuccessMessage('Gönderi beğenilere eklendi'))
      }
    );
  }
}
