import { Component } from '@angular/core';
import {LoginRegisterComponent} from "./custom/login-register/login-register/login-register.component";
import {ProfileFormComponent} from "./custom/profile-form/profile-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showComponent = true;
  determineComponent(event: any){
    this.showComponent = !(event instanceof LoginRegisterComponent);
  }
}
