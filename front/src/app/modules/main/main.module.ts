import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {LayoutComponent} from "./components/layout/layout.component";
import {ContactPanelComponent} from "./components/contact-panel/contact-panel.component";
import {ChatPanelComponent} from "./components/chat-panel/chat-panel.component";
import {HomePartComponent} from "./components/home-part/home-part.component";
import {SidePartComponent} from "./components/side-part/side-part.component";
import {SharedModule} from "../shared/shared.module";
import {ProfilePartComponent} from "./components/profile-part/profile-part.component";
import {ChatDashboardComponent} from "./components/chat-panel/components/chat-dashboard/chat-dashboard.component";
import {ChatMessageComponent} from "./components/chat-panel/components/chat-message/chat-message.component";
import {ChatHeadComponent} from "./components/chat-panel/components/chat-head/chat-head.component";
import {environment} from "../../../environments/environment";
import {StompConfig, StompService} from "@stomp/ng2-stompjs";
import {SearchComponent} from "./components/search/search.component";

const wsconfig: StompConfig = {
    url: environment.ws,
    headers: {
        login: 'guest',
        passcode: 'guest'
    },
    heartbeat_in: 0, // Typical value 0 - disabled
    heartbeat_out: 10000, // Typical value 10000 - every 10 seconds
    reconnect_delay: 5000,
    debug: true
}

@NgModule({
  declarations: [
      LayoutComponent,
      HomePartComponent,
      SidePartComponent,
      ContactPanelComponent,
      ChatPanelComponent,
      ProfilePartComponent,

      ChatDashboardComponent,
      ChatHeadComponent,
      ChatMessageComponent,
      SearchComponent
  ],
  imports: [
      CommonModule,
      MainRoutingModule,
      SharedModule,
      // WebSocketModule.config({
      //     url: environment.ws,
      //     headers: {
      //         login: 'guest',
      //         passcode: 'guest'
      //     },
      //     heartbeat_in: 0, // Typical value 0 - disabled
      //     heartbeat_out: 10000, // Typical value 10000 - every 10 seconds
      //     reconnect_delay: 5000,
      //     debug: true
      // })
  ],
  providers: [
      StompService,
      {
          provide: StompConfig,
          useValue: wsconfig
      }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [LayoutComponent]
})
export class MainModule { }
