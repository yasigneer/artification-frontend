import {Component, Input, OnInit} from '@angular/core';

import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile-cart',
  templateUrl: './profile-cart.component.html',
  styleUrls: ['./profile-cart.component.scss']
})
export class ProfileCartComponent implements OnInit {
  @Input() user!: User;
  constructor() { }

  ngOnInit(): void {
  }

}
