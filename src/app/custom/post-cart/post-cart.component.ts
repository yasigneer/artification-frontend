import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrls: ['./post-cart.component.scss']
})
export class PostCartComponent implements OnInit {
  isHovered: boolean = false;
  @Input() post!: Post

  constructor() { }

  ngOnInit(): void {
  }

}
