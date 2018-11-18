import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./components/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../../../modules/authorization/auth.module";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthModule
    ],
    declarations: [
        AuthComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
    ],
    exports: [
      AuthComponent,
      FormsModule,
      ReactiveFormsModule
  ],
    // entryComponents:[AuthComponent]
})
export class SharedModule { }
