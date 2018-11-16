import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./components/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";
import {ModalService} from "./services/modal.service";
import {ModalComponent} from "./directives/modal.component";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AuthModule
    ],
    declarations: [
        AuthComponent,
        ModalComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        ModalService
    ],
    exports: [
      AuthComponent,
      FormsModule,
      ReactiveFormsModule
  ],
    // entryComponents:[AuthComponent]
})
export class SharedModule { }
