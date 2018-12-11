import {Component, OnInit, ViewEncapsulation, ɵRenderDebugInfo} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Message, MessageInvite} from "../../../../../shared/models/message";
import {RoomMessage} from "../../../../../shared/models/room-message";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";
import {Room} from "../../../../../shared/models/room";
import {User} from "../../../../../shared/models/user";
import {Participant} from "../../../../../shared/models/participant";
import {Role} from "../../../../../shared/models/role";
import {ParticipantService} from "../../../../../shared/services/participant.service";
import {RoomService} from "../../../../../shared/services/room.service";
import {Reply} from "../../../../../shared/models/reply";
import {MessageService} from "../../../../../shared/services/message.service";
import {AuthModel} from "../../../../../shared/models/auth";
import {WebSocketService} from "../../../../../../../ui/web-socket/websocket.service";

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
    room: Room = null;
    listOfMessage: RoomMessage = null;
    IamParticipant: Participant = null;
    subscription: Subscription;
    participantSubscription: Subscription;
    messageSubscription: Subscription;

    invited: MessageInvite = null;

    constructor(
        public authService: AuthService,
        private participantService: ParticipantService,
        public roomService: RoomService,
        public wsService: WebSocketService,
        private messageService: MessageService){
        this.listOfMessage = new RoomMessage();
    }


    ngOnInit() {
        this.subscription = this.roomService.subjectRoom.subscribe(
            (data: Room)=>{
                this.listOfMessage.clear();

                if (!this.checkIamInvite(data)) {
                    this.room = new Room(data);
                    this.getMessage(data);
                }
            },
            (data)=>{}
        );

        this.wsService.submitData.subscribe(
            (data)=>{
                debugger
            },
            (data)=>{
                debugger
            });
    }

    clearState() {

    }

    getMessage(room){
        console.log('room:', room);

       this.messageSubscription =  this.messageService.getByRoomId(room.id).subscribe(
           (data:Reply)=>{
               for (let item of data.body) {
                   this.listOfMessage.addMessage(new Message(item));
               }
        });
    }


    checkIamInvite(data:Room) {
        let r,
            user: User = this.authService.getUser();

        this.IamParticipant = data.participant.filter((x)=>{ return x.user_id == user.id && x.role_id == Role.TYPE_INVITED ? x : null })[0];

        if (this.IamParticipant) {
            r = true;
            this.invited = new MessageInvite(new User(data.owner));
        } else {
            this.invited = null;
        }

        return r;
    }

    onSetReply(status) {
        if (status) {
            this.IamParticipant.role_id = Role.TYPE_ACTIVE;

            this.participantSubscription = this.participantService.save(this.IamParticipant.getProperties())
                .subscribe(
                (data: Reply)=>{
                    if (data.status) {
                        this.invited = null;
                    }
                },
                (data)=>{

                })
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.participantSubscription.unsubscribe();
        this.messageSubscription.unsubscribe();
    }

}
