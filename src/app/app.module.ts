import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterModule } from 'src/app/custom/login-register/login-register.module';
import { NavigationBarComponent } from './custom/navigation-bar/navigation-bar.component';
import { PostCartComponent } from './custom/post-cart/post-cart.component';
import { PostListComponent } from './custom/post-list/post-list.component'


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PostCartComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginRegisterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
