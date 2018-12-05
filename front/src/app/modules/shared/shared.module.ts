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
// import {WebSocketModule} from "../../../ui/web-socket/web-socket.module";
import {environment} from "../../../environments/environment";
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
// import {WebSocketModule} from "../../../ui/socket/web-socket.module";
import { NgSelectModule } from '@ng-select/ng-select';

const stompConfig: StompConfig = {
    // Which server?
    url: environment.ws,
    // url: 'ws://127.0.0.1:15674/ws',

    // Headers
    // Typical keys: login, passcode, host
    headers: {
        // login: 'guest',
        // passcode: 'guest'
    },

    // How often to heartbeat?
    // Interval in milliseconds, set to 0 to disable
    heartbeat_in: 0, // Typical value 0 - disabled
    heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

    // Wait in milliseconds before attempting auto reconnect
    // Set to 0 to disable
    // Typical value 5000 (5 seconds)
    reconnect_delay: 5000,

    // Will log diagnostics on console
    debug: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,

        NgSelectModule,
        ReactiveFormsModule,
        AuthModule,
        ModalModule,
        FontAwesomeModule,
        StorageModule,
        MomentModule,
        // WebSocketModule
        // WebSocketModule.config({
        //     url: environment.ws
        // })
        // WebSocketModule.config({
        //     url: environment.ws
        // })
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
        StompService,
        {
            provide: StompConfig,
            useValue: stompConfig
        }
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
