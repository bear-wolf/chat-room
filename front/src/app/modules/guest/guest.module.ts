import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import {GuestComponent} from "./components/layout/guest.component";
import {HomePartComponent} from "./components/home-part/home-part.component";
import {SharedModule} from "../shared/shared.module";
import {RemindPasswordComponent} from "./components/remind-password/remind-password.component";

@NgModule({
  declarations: [
      GuestComponent,
      HomePartComponent,
      RemindPasswordComponent
  ],
  imports: [
      CommonModule,
      SharedModule,
      GuestRoutingModule
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
})
export class GuestModule { }
