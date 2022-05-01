import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegisterModule } from 'src/app/custom/login-register/login-register.module';
import { NavigationBarComponent } from './custom/navigation-bar/navigation-bar.component';
import { PostCartComponent } from './custom/post-cart/post-cart.component';
import { PostListComponent } from './custom/post-list/post-list.component';
import { SearchBarComponent } from './custom/search-bar/search-bar.component';
import { PostFormComponent } from './custom/post-form/post-form.component'
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileCartComponent } from './custom/profile-cart/profile-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PostCartComponent,
    PostListComponent,
    SearchBarComponent,
    PostFormComponent,
    ProfileCartComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LoginRegisterModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
