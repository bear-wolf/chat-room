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

@NgModule({
  declarations: [
      LayoutComponent,
      HomePartComponent,
      SidePartComponent,
      ContactPanelComponent,
      ChatPanelComponent,
      ProfilePartComponent
  ],
  imports: [
      CommonModule,
      MainRoutingModule,
      SharedModule,
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [LayoutComponent]
})
export class MainModule { }
