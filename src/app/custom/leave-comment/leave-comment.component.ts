import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {switchMap, tap} from "rxjs/operators";
import {Subscription} from "rxjs";

import {ReviewService} from "../../services/review.service";
import {Review} from "../../models/review.model";
import {CurrentUserService} from "../../services/current-user.service";

@Component({
  selector: 'app-leave-comment',
  templateUrl: './leave-comment.component.html',
  styleUrls: ['./leave-comment.component.scss']
})
export class LeaveCommentComponent implements OnInit {
  @Input() postId?: number;
  @Output() isChanged : EventEmitter<boolean> = new EventEmitter<boolean>()
  comment?: FormGroup;
  active = false;
  currentUserId?: number;
  sub? : Subscription;
  constructor(
    protected formBuilder: FormBuilder,
    protected currentUserService: CurrentUserService,
    protected reviewService: ReviewService) { }

  ngOnInit(): void {
    this.comment = this.formBuilder.group({
      commentMessage: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(280)]]
    })
    this.sub = this.comment.get('commentMessage')?.valueChanges.pipe(
      tap(comment => {
        this.active = comment?.length > 2;
      }),
      switchMap(()=> this.currentUserService.currentUser$!),
      tap((user)=>this.currentUserId = user.userId!)
    ).subscribe();
  }
  generateComment(): Review{
    return {
      postId : this.postId!,
      commentMessage : this.comment?.get('commentMessage')?.value,
      userId : this.currentUserId!
    }
  }
  leaveComment(){
    this.reviewService.makeComment(this.generateComment()).subscribe(()=> {
      this.isChanged?.emit();
      this.comment?.reset();
      this.active = false;
    })
  }
}
