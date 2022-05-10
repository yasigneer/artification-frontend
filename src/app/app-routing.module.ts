import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginRegisterComponent} from "./custom/login-register/login-register/login-register.component";
import {ProfileComponent} from "./custom/profile/profile.component";
import {FeedComponent} from "./custom/feed/feed.component";
import {CommentComponent} from "./custom/comment/comment.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {path: 'login', component: LoginRegisterComponent},
  {path: 'home', component: FeedComponent},
  {path: 'comment', component: CommentComponent},
  {path: ':nickname', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
