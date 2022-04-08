import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterModule } from 'src/app/custom/login-register/login-register.module';
import { NavigationBarComponent } from './custom/navigation-bar/navigation-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
