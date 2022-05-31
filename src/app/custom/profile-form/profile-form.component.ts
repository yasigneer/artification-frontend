import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {ValidatorService} from "../../services/validator.service";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  userForm!: FormGroup;
  notImage = false;
  fileReader = new FileReader();
  formData = new FormData();
  constructor(
    protected formBuilder: FormBuilder,
    protected userService: UserService,
    protected validatorService: ValidatorService,
    protected dialogRef: MatDialogRef<ProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: User
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userId: this.data!.userId,
      nickName: this.data!.nickName,
      profilePhotoPath: [this.data!.profilePhotoPath],
      image: [null],
      description: [this.data!.description || '', Validators.required]
    })
  }
  handleChange(event: any){
    let file = event.target?.files[0];
    if(!this.validatorService.imageExtensionValidator(file.type)){
      this.notImage = true;
      return;
    }
    this.uploadImage(file);
  }
  uploadImage(file: File){
    let avatar = document.querySelector('.update-avatar');
    this.fileReader.onload = () => {
      let imageURL = this.fileReader.result;
      avatar!.innerHTML = `<img src="${imageURL}" alt="image" style="width: 100%; height: 100%; object-fit: cover; border-radius:9999px;">`;
    }
    this.fileReader.readAsDataURL(file);
    this.userForm.patchValue({
      image: file
    })
  }
  updateUser(){
    Object.keys(this.userForm!.controls).forEach(
      formControlName => {this.formData.append(formControlName,  this.userForm!.get(formControlName)?.value);
      });
    this.userService.updateUser(this.formData).subscribe(()=>{
      this.dialogRef.close();
      location.reload();
    });
  }
  get isCloudURL(): boolean{
    if( this.data?.profilePhotoPath == null){
      return false
    }
    return this.data.profilePhotoPath.includes(environment.cloudUrl);
  }
}
