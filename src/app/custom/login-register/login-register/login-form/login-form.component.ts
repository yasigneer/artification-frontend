import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginUser!: FormGroup;

  constructor(
    protected authService: AuthService,
    protected fb: FormBuilder,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.loginUser = this.fb.group({
      nickName: '',
      passwordHashed: ''
    });
  }

  login() {
    this.authService.login(this.loginUser.value).pipe(first()).subscribe(
      (data) => {
        if(data){
          this.router.navigate(['/home']);
        }
      }
    );
  }
}
