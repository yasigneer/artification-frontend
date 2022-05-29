import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-badge',
  templateUrl: './user-badge.component.html',
  styleUrls: ['./user-badge.component.scss']
})
export class UserBadgeComponent implements OnInit {
  @Input() user?: User
  isHovered = false;
  constructor(protected authService: AuthService) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
}
