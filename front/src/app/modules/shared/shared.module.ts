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
import {RequestInterceptor} from "./services/interceptors/request.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {StorageModule} from "../../../ui/storage/storage.module";
import {RemindPasswordDialogComponent} from "./components/modal-dialogs/components/remind-password/remind-password-dialog.component";
import { MomentModule } from 'ngx-moment';
import {RoomDialogComponent} from "./components/modal-dialogs/components/room/room-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        ModalModule,
        FontAwesomeModule,
        StorageModule,
        MomentModule
    ],
    declarations: [
        AuthComponent,
        CheckInComponent,
        SignInComponent,
        RoomDialogComponent,

        ModalDialogsComponent,
        AuthenticationDialogComponent,
        RemindPasswordDialogComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
    ],
    exports: [
      AuthComponent,
      FormsModule,
      ReactiveFormsModule,
      ModalDialogsComponent,
      RoomDialogComponent
  ],
    // entryComponents:[AuthComponent]
})
export class SharedModule { }
