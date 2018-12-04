import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../../shared/services/room.service";
import {Reply} from "../../../shared/models/reply";
import {Room} from "../../../shared/models/room";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {EnumDialogs} from "../../../shared/components/modal-dialogs/enum-dialogs";
import {Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {StompService} from "@stomp/ng2-stompjs";
import {Message} from '@stomp/stompjs';
import {debug} from "util";
// import {WebSocketService} from "../../../../../ui/socket/services/web-socket.service";

@Component({
  selector: 'contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit, OnDestroy{
    listOfRoom = null;

    public messages: Subject<Message>;

    constructor(private roomService: RoomService,
                private _stompService: StompService,
                // private webSocketService: WebSocketService,
                private modalService: ModalService) {

    }


    onAddChat() {
        this.modalService.open(EnumDialogs.CreateRoom);
    }

    ngOnInit(): void {
        // this.webSocketService
        //     .connect(environment.host)
        //     .subscribe((msg_body: any) => {
        //         debugger;
        //         console.log(`Received: ${msg_body}`);
        //     },(error)=>{
        //         console.log(`Error: ${error.message}`);
        //     });
        //     // .map((response: MessageEvent): Message => {
        //     //     debugger;
        //     //     let data = JSON.parse(response.data);
        //     //     return {
        //     //         author: data.author,
        //     //         message: data.message
        //     //     }
        //     // });

        let stomp_subscription = this._stompService.subscribe('/');

        stomp_subscription
            // .map((message: Message) => {
            //     debugger;
            //     return message.body;
            // })
            .subscribe((msg_body: any) => {
                debugger;
                console.log(`Received: ${msg_body}`);
            },(error)=>{
                console.log(`Error: ${error.message}`);
            });

        this.roomService.get().subscribe(
        (data: Reply)=>{
            this.listOfRoom = [];
            for (let item of <[Room]>data.body) {
                this.listOfRoom.push(new Room(item));
            }


        }, (data: Reply)=>{

        })

        debugger;
        this._stompService.publish('test','description');
    }

    ngOnDestroy(): void {
    }
}
