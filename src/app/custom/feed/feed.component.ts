import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from "rxjs";

import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {
  posts$!: Observable<Post[]>
  constructor(protected postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.posts$!;
  }

}
