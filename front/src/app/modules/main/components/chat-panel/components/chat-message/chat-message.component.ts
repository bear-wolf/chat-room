import {Component, OnInit, ViewEncapsulation, ɵRenderDebugInfo} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Message} from "../../../../../shared/models/message";
import {ChatService} from "../../../../services/chat.service";
import {RoomMessage} from "../../../../../shared/models/room-message";

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {

    listOfMessage: RoomMessage = null;

    constructor(private chatService: ChatService){
        this.listOfMessage = new RoomMessage();
    }


    ngOnInit() {
        this.chatService.subjectRoom.subscribe(
            (data)=>{
                debugger;

                this.listOfMessage.addMessage(new Message()
                    .setOwnerId(1)
                )
            },
            (data)=>{}
        );
    }

    ngOnDestroy() {
    }

}
