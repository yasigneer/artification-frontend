import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from "./custom/login-register/login-register/login-register.component";
import {PostListComponent} from "./custom/post-list/post-list.component";
import {ProfileCartComponent} from "./custom/profile-cart/profile-cart.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  {path: 'login', component: LoginRegisterComponent},
  {path: 'home', component: PostListComponent},
  {path: 'user', component: ProfileCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
