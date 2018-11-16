import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainModule} from "../main/main.module";
import {GuestModule} from "../guest/guest.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CheckInComponent} from "./components/check-in/check-in.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "../shared/components/auth/auth.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      AuthRoutingModule,
      ReactiveFormsModule,
  ],
    declarations: [
        CheckInComponent,
        SignInComponent
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [

    ],
    exports: [
        CheckInComponent,
        SignInComponent
  ],
    // entryComponents:[AuthComponent]
})
export class AuthModule { }
