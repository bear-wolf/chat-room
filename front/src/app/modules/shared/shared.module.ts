import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainModule} from "../main/main.module";
import {GuestModule} from "../guest/guest.module";

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    GuestModule
  ],
  declarations: []
})
export class SharedModule { }
