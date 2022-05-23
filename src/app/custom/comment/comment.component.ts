import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../models/review.model";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment?: Review
  constructor() { }

  ngOnInit(): void {
  }

}
