import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  comments?: number[];
  sub? : Subscription;
  constructor(protected activatedRoute: ActivatedRoute) {
    this.comments = Array(15).fill(0).map((v,i)=>i);
  }

  ngOnInit(): void {
  }

}
