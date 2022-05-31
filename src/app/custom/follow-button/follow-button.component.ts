import {Component, Input, OnInit} from '@angular/core';
import {FollowService} from "../../services/follow.service";
import {Follower} from "../../models/follower.model";

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  @Input() userId?: number
  @Input() currentUserId?: number;
  isFollowed = false;
  follower?: Follower
  constructor(
    protected followService: FollowService
  ) { }

  ngOnInit(): void {
    this.checkFollowed();
    this.follower = {
      userId: this.userId!,
      followerId: this.currentUserId!
    }
  }
  follow() {
    this.followService.follow(this.follower!).subscribe(()=> {
      this.isFollowed = !this.isFollowed
    })
  }
   checkFollowed(){
    this.followService.getFollowers(this.userId!).subscribe(
      (users)=> {
        let followerIds = users.map((user)=> user.followerId!);
        this.isFollowed = followerIds.includes(this.currentUserId!);
      }
    )
   }
}
