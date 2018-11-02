import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./modules/shared/shared.module";

const stompConfig: StompConfig = {
    // Which server?
    url: 'ws://89.223.90.166/api/role_play_game/ws',

    // Headers
    // Typical keys: login, passcode, host
    headers: {
        login: 'guest',
        passcode: 'guest'
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
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
