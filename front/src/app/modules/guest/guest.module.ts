import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import {GuestComponent} from "./layout/guest.component";
import {HomePartComponent} from "./components/home-part.component";
import {AuthComponent} from "../shared/components/auth/auth.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
      GuestComponent,
      HomePartComponent
  ],
  imports: [
      CommonModule,
      GuestRoutingModule
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
})
export class GuestModule { }
