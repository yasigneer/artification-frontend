import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {User} from "../../../../models/user.model";
import {RegisterService} from "../../../../services/register.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(protected formBuilder : FormBuilder, protected registerService: RegisterService) { }
  registerForm!:  FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nickName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordAgain: ['', Validators.required]
    })
  }
  checkValidForm(){
    return this.registerForm?.value.password == this.registerForm?.value.passwordAgain;
  }
  initializeUser(): User{
    return  {
      nickName: this.registerForm?.value.nickName,
      email: this.registerForm?.value.email,
      passwordHashed: this.registerForm?.value.password
    }
  }
  register(){
    if(!this.checkValidForm()){
      console.log('Paralolar eşleşmemekte');
      return;
    }
    let registerUser = this.initializeUser();
    this.registerService.register(registerUser).subscribe(
      data => console.log(data)
    )
  }
}
