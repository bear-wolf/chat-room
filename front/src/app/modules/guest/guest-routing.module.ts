import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestComponent} from "./components/layout/guest.component";
import {RemindPasswordComponent} from "./components/remind-password/remind-password.component";

const routes: Routes = [
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: 'remind-password', component: RemindPasswordComponent
            }
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
