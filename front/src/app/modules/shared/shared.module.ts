import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainModule} from "../main/main.module";
import {GuestModule} from "../guest/guest.module";
import {AuthComponent} from "./components/auth/auth.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ParticipantService} from "./services/participant.service";
import {MessageService} from "./services/message.service";
import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
import {UserService} from "./services/user.service";
import {RoleService} from "./services/role.service";
import {ProfileService} from "./services/profile.service";

@NgModule({
    imports: [
      CommonModule,
      // MainModule,
      GuestModule,
      FormsModule,
      ReactiveFormsModule,
  ],
    declarations: [
      AuthComponent
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        HttpClient,
        AuthService,
        MessageService,
        ParticipantService,
        ProfileService,
        RoleService,
        StorageService,
        UserService
    ],
    exports: [
      AuthComponent,
      FormsModule,
      ReactiveFormsModule
  ],
    // entryComponents:[AuthComponent]
})
export class SharedModule { }
