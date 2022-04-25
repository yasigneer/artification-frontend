import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts?: number[];

  constructor(protected authService: AuthService) {
    this.posts = Array(15).fill(0).map((v,i)=>i);
  }

  ngOnInit(): void {
  }

}
