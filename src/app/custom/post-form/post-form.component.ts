import { Component, OnInit } from '@angular/core';
import {ValidatorService} from "../../services/validator.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  isDragged = false;
  notImage = false;
  fileReader = new FileReader();
  imageValidator = this.validatorService.imageExtensionValidator;
  constructor(protected validatorService:ValidatorService) { }
  ngOnInit(): void {}
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
  }

}
