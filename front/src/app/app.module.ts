import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {GuestModule} from "./modules/guest/guest.module";
import {HttpClientModule} from "@angular/common/http";
import {ModalModule} from "../modules/modal/modal.module";
import {AuthModule} from "../modules/authorization/auth.module";
import {StorageModule} from "../modules/storage/storage.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GuestModule,
    ModalModule,
    AuthModule,
    StorageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
