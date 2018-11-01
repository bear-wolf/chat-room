import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LayoutSimpleComponent} from "./modules/layout/simple/simple.component";
import {ChatPanelComponent} from "./components/chat-panel/chat-panel.component";
import {ContactPanelComponent} from "./components/contact-panel/contact-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutSimpleComponent,
    ChatPanelComponent,
    ContactPanelComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
