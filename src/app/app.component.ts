import { Component } from '@angular/core';
import {LoginRegisterComponent} from "./custom/login-register/login-register/login-register.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHeader = true;
  determineComponent(event: any){
    this.showHeader = !(event instanceof LoginRegisterComponent);
  }
}
