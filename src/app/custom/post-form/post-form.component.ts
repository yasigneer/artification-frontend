import {Component, OnDestroy, OnInit} from '@angular/core';
import {ValidatorService} from "../../services/validator.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {PostService} from "../../services/post.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {
  currentUser!: User;
  sub? : Subscription;
  isDragged = false;
  notImage = false;
  fileReader = new FileReader();
  formData = new FormData();
  postForm!: FormGroup
  imageValidator = this.validatorService.imageExtensionValidator;

  constructor(
    protected authService: AuthService,
    protected validatorService:ValidatorService,
    protected formBuilder: FormBuilder,
    protected postService: PostService,
    protected dialog: MatDialogRef<PostFormComponent>) { }
  ngOnInit(): void {
    this.sub = this.authService.currentUser$?.subscribe(user => this.currentUser = user);
    this.postForm = this.formBuilder.group({
      postTitle: ['',[Validators.required]],
      postDescription: ['',[Validators.required]],
      file: [null],
      userId: this.currentUser.userId!
    })
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  handleDragOver(event: any){
    event.stopPropagation();
    event.preventDefault();
    this.isDragged = true;
  }

  handleDragLeave(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.isDragged = false
  }

  handleDrop(event: any){
   event.preventDefault();
   let file = event.dataTransfer?.files[0];
   if(!this.imageValidator(file.type)){
     this.notImage = true;
     return;
   }
   this.uploadImage(file);
  }

  handleChange(event: any){
    let file = event.target?.files[0];
    if(!this.imageValidator(file.type)){
      this.notImage = true;
      return;
    }
    this.uploadImage(file);
  }

  uploadImage(file: File){
    let dragArea = document.querySelector('.drag-area');
    this.fileReader.onload = () => {
      let imageURL = this.fileReader.result;
      dragArea!.innerHTML = `<img src="${imageURL}" alt="image" style="width: 100%; height: 100%; object-fit: cover; border-radius:8px;">`;
    }
    this.fileReader.readAsDataURL(file);
    this.postForm.patchValue({
      file: file
    })
  }

  sharePost(){
    Object.keys(this.postForm.controls).forEach(
      formControlName => {this.formData.append(formControlName,  this.postForm.get(formControlName)?.value);
    });
    this.postService.sharePost(this.formData).subscribe();
  }

}
