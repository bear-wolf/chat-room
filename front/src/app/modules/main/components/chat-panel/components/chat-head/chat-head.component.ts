import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatService} from "../../../../services/chat.service";
import {Room} from "../../../../../shared/models/room";
import {Subscription} from "rxjs";

@Component({
  selector: 'chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.scss'],
})
export class ChatHeadComponent implements OnInit, OnDestroy {
    room: Room = null;
    subscription: Subscription = null;

    constructor(private chatService: ChatService){
    }


    ngOnInit() {
        this.subscription = this.chatService.subjectRoom.subscribe(
            (data:Room)=>{
                debugger;
                this.room = new Room(data);
            },
            (data)=>{
                debugger;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
