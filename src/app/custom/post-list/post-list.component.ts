import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {Post} from "../../models/post.model";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {
  @Input() posts?: Post[]
  @Input() doNotReverse? : boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.posts = this.posts?.filter((post) => post.postPath!.includes(environment.cloudUrl));
    if(!this.doNotReverse){
      this.posts= this.posts?.reverse()
    }
  }
}
