import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from "./custom/login-register/login-register/login-register.component";
import {PostListComponent} from "./custom/post-list/post-list.component";
import {ProfileSummaryComponent} from "./custom/profile-summary/profile-summary.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {path: 'login', component: LoginRegisterComponent},
  {path: 'home', component: PostListComponent},
  {path: 'user', component: ProfileSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
