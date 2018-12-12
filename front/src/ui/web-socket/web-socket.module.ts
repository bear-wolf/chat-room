import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { config } from './websocket.config';
 import { WebSocketConfig } from './websocket.interfaces';
import {WebSocketService} from "./websocket.service";
import {StompConfig, StompService} from "@stomp/ng2-stompjs";


@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule
    ],
    exports: []
})
export class WebSocketModule {
    public static config(wsConfig: WebSocketConfig): ModuleWithProviders {
        return {
            ngModule: WebSocketModule,
            providers: [
                // WebSocketService,
                // {
                //     provide: config,
                //     useValue: wsConfig
                // },
                // StompService,
                // {
                //     provide: StompConfig,
                //     useValue: wsConfig
                // }
            ]
        };
    }
}
