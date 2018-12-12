import { Injectable, OnDestroy, Inject } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { config } from './websocket.config';
import {StompService} from "@stomp/ng2-stompjs";
import {WebSocketConfig} from "./websocket.interfaces";


@Injectable({
    providedIn: 'root'
})
export class WebSocketService implements OnDestroy{
    public submitData = new Subject<any>();
    private stomp_subscription: any;

    constructor(@Inject(config) private wsConfig: WebSocketConfig,
                private _stompService: StompService) {
debugger;
        this.connect();
        this.getMessage();
    }

    ngOnDestroy() {
        //this._stompService.close();
    }


    /*
    * connect to WebSocked
    * */
    connect() {
        this._stompService.initAndConnect();
    }

    send(queueName: string) {
        //this._messageQueue.push(data);
        this._stompService.publish(queueName);
    }

    private getMessage(){
        this.stomp_subscription = this._stompService.subscribe('/topic/');

        this.stomp_subscription
        // .map((chat-message: Message) => {
        //     debugger;
        //     return chat-message.body;
        // })
            .subscribe((msg_body: any) => {
                console.log('data:', msg_body);
                this.submitData.next(msg_body)
            },(error)=>{
                console.log('error:', error);
                this.submitData.error(error)
            });
    }

    //
    // /*
    // * on message to server
    // * */
    // public sendMessage(event: string, data: any = {}): void {
    //     if (event && this.websocket.readyState === 1) {
    //         this.websocket.send(JSON.stringify({event, data}));
    //     } else {
    //         console.log('Send error!');
    //     }
    // }
}
