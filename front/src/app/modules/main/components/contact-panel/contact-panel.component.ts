import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RoomService} from "../../../shared/services/room.service";
import {Reply} from "../../../shared/models/reply";
import {Room} from "../../../shared/models/room";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {EnumDialogs} from "../../../shared/components/modal-dialogs/enum-dialogs";
import {Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {StompService} from "@stomp/ng2-stompjs";
import {Message} from '@stomp/stompjs';
import {ModelDialog} from "../../../shared/models/model-dialog";
import {ParticipantService} from "../../../shared/services/participant.service";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Role} from "../../../shared/models/role";
import {LayoutService} from "../../services/layout.service";
import {Layout, ModeLayout} from "../models/layout";
import {Participant} from "../../../shared/models/participant";

import {User} from "../../../shared/models/user";
// import {WebSocketService} from "../../../../../ui/web-socket/services/web-web-socket.service";

@Component({
  selector: 'contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit, OnDestroy{
    listOfRoom = null;

    //@ViewChild('li') contactElement;

    public messages: Subject<Message>;

    constructor(private roomService: RoomService,
                private participantService: ParticipantService,
                private layoutService: LayoutService,
                private authService: AuthService,
                // private webSocketService: WebSocketService,
                private modalService: ModalService) {
    }

    onOpenContact(room: Room) {
        this.roomService.setRoom(room);

        this.layoutService.setMode(ModeLayout.VIEW_CHAT);
    }

    ngOnInit(): void {
        // this.webSocketService
        //     .connect(environment.host)
        //     .subscribe((msg_body: any) => {
        //         debugger;
        //         console.log(`Received: ${msg_body}`);
        //     },(error)=>{
        //         console.log(`Error: ${error.chat-message}`);
        //     });
        //     // .map((response: MessageEvent): Message => {
        //     //     debugger;
        //     //     let data = JSON.parse(response.data);
        //     //     return {
        //     //         author: data.author,
        //     //         chat-message: data.chat-message
        //     //     }
        //     // });

        this.getRoomByOwnerOrParticipant();
    }

    getRoomByOwnerOrParticipant(){
        this.roomService
            .getByOwnerAndParticipant({
                user_id: this.authService.getUser().getId(),
                // role_id: Role.TYPE_INVITED
            })
            .subscribe(
                (data)=>{
                    if (this.listOfRoom == null) {
                        this.listOfRoom = [];
                    }

                    let body = data.body,
                        participant: Participant[];

                    if (body && body.room) {
                        participant = data.body.participant;

                        for (let item of body.room) {
                            let room = new Room(item);
                            let user: any = body.user.filter((x)=>{ return x.id === room.user_id ? x : null;})[0];

                            room.setOwner(user);

                            if (participant) {
                                room.addParticipant(new Participant(participant.filter(x => x.room_id === room.id)[0]));
                            }

                            this.listOfRoom.push(room);
                        }
                    }

                },
                (data)=>{}
            );
    }

    ngOnDestroy(): void {
    }
}
