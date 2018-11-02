import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestComponent} from "./layout/guest.component";

const routes: Routes = [
  {
    path: '', component: GuestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
