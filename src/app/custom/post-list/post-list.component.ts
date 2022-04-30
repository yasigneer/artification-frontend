import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Post} from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {
  posts?: number[];
  posts$?: Observable<Post[]>

  constructor(protected postService: PostService) {
    this.posts = Array(15).fill(0).map((v,i)=>i);
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts$?.pipe(
      map((posts)=>posts.filter((post) =>post.postPath?.includes(environment.cloudUrl)))
    )
  }
}
