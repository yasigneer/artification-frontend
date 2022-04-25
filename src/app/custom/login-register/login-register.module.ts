import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginFormComponent } from './login-register/login-form/login-form.component';
import { RegisterFormComponent } from './login-register/register-form/register-form.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginRegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  exports: [
    LoginRegisterComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class LoginRegisterModule { }
