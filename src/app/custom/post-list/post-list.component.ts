import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: number[];

  constructor() {
    this.posts = Array(15).fill(0).map((v,i)=>i);
  }

  ngOnInit(): void {
  }

}
