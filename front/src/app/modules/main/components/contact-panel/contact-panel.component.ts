import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../../shared/services/room.service";
import {Reply} from "../../../shared/models/reply";
import {Room} from "../../../shared/models/room";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {EnumDialogs} from "../../../shared/components/modal-dialogs/enum-dialogs";
import {Subject} from "rxjs";
import {WebSocketService} from "../../../../../ui/socket/services/web-socket.service";
import {environment} from "../../../../../environments/environment";

export interface Message {
    author: string,
    message: string
}

@Component({
  selector: 'contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit, OnDestroy{
    listOfRoom = null;

    public messages: Subject<Message>;

    constructor(private roomService: RoomService,
                private webSocketService: WebSocketService,
                private modalService: ModalService) {

    }


    onAddChat() {
        this.modalService.open(EnumDialogs.CreateRoom);
    }

    ngOnInit(): void {
        debugger;
        // this.webSocketService
        //     .connect(environment.host)
        //     .map((response: MessageEvent): Message => {
        //         debugger;
        //         let data = JSON.parse(response.data);
        //         return {
        //             author: data.author,
        //             message: data.message
        //         }
        //     });

        this.roomService.get().subscribe(
        (data: Reply)=>{
            this.listOfRoom = [];
            for (let item of <[Room]>data.body) {
                this.listOfRoom.push(new Room(item));
            }


        }, (data: Reply)=>{

        })
    }

    ngOnDestroy(): void {
    }
}
