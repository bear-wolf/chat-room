import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  ],
    declarations: [
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AuthService
    ],
    exports: [

  ],
    // entryComponents:[AuthComponent]
})
export class AuthModule { }
