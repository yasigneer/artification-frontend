import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {User} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {ProfileFormComponent} from "../profile-form/profile-form.component";
import {CurrentUserService} from "../../services/current-user.service";

@Component({
  selector: 'app-profile-cart',
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss']
})
export class ProfileCartComponent implements OnInit {
  @Input() user!: User;
  currentUser$? : Observable<User>
  constructor(
    protected currentUserService: CurrentUserService,
    protected dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.currentUserService.currentUser$
  }
  openProfileForm(user: User){
    this.dialog.open(ProfileFormComponent,{
      data: user
    })
  }
}
