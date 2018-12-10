import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Room} from "../../../../../shared/models/room";
import {Subscription} from "rxjs";
import {RoomService} from "../../../../../shared/services/room.service";

@Component({
  selector: 'chat-head',
  templateUrl: './chat-head.component.html',
  styleUrls: ['./chat-head.component.scss'],
})
export class ChatHeadComponent implements OnInit, OnDestroy {
    room: Room = null;
    subscription: Subscription = null;

    constructor(private roomService: RoomService){
    }


    ngOnInit() {
        this.subscription = this.roomService.subjectRoom.subscribe(
            (data:Room)=>{
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
