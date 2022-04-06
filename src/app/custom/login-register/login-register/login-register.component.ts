import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  isRegistered: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  swipeForms(){
    this.isRegistered ? this.isRegistered = false : this.isRegistered = true;
  }
}
