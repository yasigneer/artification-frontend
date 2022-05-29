import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  @Input() profilePhoto?: string
  @Input() nickname?: string
  constructor() { }
  ngOnInit(): void {
  }
  get hasPhoto():boolean{
    if(this.profilePhoto == null){
      return false
    }
    return this.profilePhoto.includes(environment.cloudUrl);
  }
}
