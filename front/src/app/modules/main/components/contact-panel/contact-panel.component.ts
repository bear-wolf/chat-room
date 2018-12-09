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
import {ChatService} from "../../services/chat.service";
import {User} from "../../../shared/models/user";
// import {WebSocketService} from "../../../../../ui/socket/services/web-socket.service";

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
                private _stompService: StompService,
                private participantService: ParticipantService,
                private layoutService: LayoutService,
                private chatService: ChatService,
                private authService: AuthService,
                // private webSocketService: WebSocketService,
                private modalService: ModalService) {
    }


    onAddChat() {
        this.modalService.open(ModelDialog.TYPE_CREATE_ROOM_ST);
    }

    onOpenContact(room: Room) {
        this.chatService.setRoom(room);

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

        // let stomp_subscription = this._stompService.subscribe('/');
        //
        // stomp_subscription
        //     // .map((chat-message: Message) => {
        //     //     debugger;
        //     //     return chat-message.body;
        //     // })
        //     .subscribe((msg_body: any) => {
        //         debugger;
        //         console.log(`Received: ${msg_body}`);
        //     },(error)=>{
        //         console.log(`Error: ${error.chat-message}`);
        //     });

        this.getInvited();
        this.getMyChat()

        //this._stompService.publish('test','description');
    }

    getInvited(){
        this.roomService
            .getInvited({
                user_id: this.authService.getUser().getId(),
                role_id: Role.TYPE_INVITED
            })
            .subscribe(
                (data)=>{
                    if (this.listOfRoom == null) {
                        this.listOfRoom = [];
                    }

                    let body = data.body,
                        participant: Participant[] = data.body.participant;
                    debugger;

                    if (body && body.room) {
                        for (let item of body.room) {
                            let room = new Room(item);
                            let user: any = body.user.filter((x)=>{ return x.id === room.user_id ? x : null;})[0];

                            room.setOwner(user);

                            if (participant) {
                                room.addParticipant( participant.filter(x => x.room_id === room.id)[0]);
                            }

                            this.listOfRoom.push(room);
                        }
                    }

                },
                (data)=>{}
            );
    }
    getMyChat(){
        // this.roomService.get().subscribe(
        // (data: Reply)=>{
        //     if (this.listOfRoom == null) {
        //         this.listOfRoom = [];
        //     }
        //     for (let item of <[Room]>data.body) {
        //         this.listOfRoom.push(new Room(item));
        //     }
        // }, (data: Reply)=>{
        //
        // })
    }

    ngOnDestroy(): void {
    }
}
