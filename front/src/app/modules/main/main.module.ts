import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainRoutingModule} from "./main-routing.module";
import {LayoutComponent} from "./layout/layout.component";
import {ContactPanelComponent} from "./components/contact-panel/contact-panel.component";
import {ChatPanelComponent} from "./components/chat-panel/chat-panel.component";

@NgModule({
  declarations: [
      LayoutComponent,
      ContactPanelComponent,
      ChatPanelComponent
  ],
  imports: [
      CommonModule,
      MainRoutingModule
  ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [LayoutComponent]
})
export class MainModule { }
