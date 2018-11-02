import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import {GuestComponent} from "./layout/guest.component";

@NgModule({
  declarations: [
      GuestComponent
  ],
  imports: [
      CommonModule,
      GuestRoutingModule
  ],
  providers: [],
  bootstrap: [GuestComponent]
})
export class GuestModule { }
