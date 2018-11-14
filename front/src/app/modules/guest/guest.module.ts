import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import {GuestComponent} from "./layout/guest.component";
import {HomePartComponent} from "./components/home-part.component";

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
