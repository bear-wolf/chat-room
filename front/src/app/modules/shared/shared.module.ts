import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthComponent} from "./components/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "../../../ui/authorization/auth.module";
import {ModalModule} from "../../../ui/modal/modal.module";
import {ModalDialogsComponent} from "./components/modal-dialogs/modal-dialogs.component";
import {CheckInComponent} from "./components/check-in/check-in.component";
import {AuthenticationDialogComponent} from "./components/modal-dialogs/components/authentication/authentication-dialog.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SignInComponent} from "./components/sign-in/sign-in.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        ModalModule,
        FontAwesomeModule
    ],
    declarations: [
        AuthComponent,
        CheckInComponent,
        SignInComponent,
        AuthenticationDialogComponent,
        ModalDialogsComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
    ],
    exports: [
      AuthComponent,
      FormsModule,
      ReactiveFormsModule,
      ModalDialogsComponent,
  ],
    // entryComponents:[AuthComponent]
})
export class SharedModule { }
