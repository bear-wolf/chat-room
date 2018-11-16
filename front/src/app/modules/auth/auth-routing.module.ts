import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {CheckInComponent} from "./components/check-in/check-in.component";
import {AuthComponent} from "../shared/components/auth/auth.component";

const routes: Routes = [
  // { path: 'guest', component: AuthComponent},
  { path: 'sing-in', component: SignInComponent},
  { path: 'check-in', component: CheckInComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
