import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";
import {CurrentUserService} from "../../../../services/current-user.service";
import {AuthService} from "../../../../services/auth.service";
import {MessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginUser!: FormGroup;
  currentUser$?: Observable<User> = this.currentUserService.currentUser$

  constructor(
    protected authService: AuthService,
    protected currentUserService: CurrentUserService,
    protected fb: FormBuilder,
    protected router: Router,
    protected messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginUser = this.fb.group({
      nickName: ['', Validators.required],
      passwordHashed: ['', Validators.required]
    });
    this.currentUser$?.subscribe(user => {
      if( user ){
        this.router.navigate(['/home'])
      }
    })
  }

  login() {
    this.authService.login(this.loginUser.value).subscribe((login)=>{
      if ( login ){
        this.router.navigate(['/home'])
      }
      else {
        this.messageService.showErrorMessage('Hatalı kullanıcı adı veya parola girişi. Lütfen tekrar deneyiniz.')
      }
    });
  }
}
