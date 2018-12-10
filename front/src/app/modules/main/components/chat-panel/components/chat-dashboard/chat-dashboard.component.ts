import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RoomService} from "../../../../../shared/services/room.service";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";
import {Room} from "../../../../../shared/models/room";
import {User} from "../../../../../shared/models/user";
import {Role} from "../../../../../shared/models/role";
import {Message, MessageInvite, MessageStatus} from "../../../../../shared/models/message";
import {Participant} from "../../../../../shared/models/participant";
import {Subscription} from "rxjs";
import {Reply} from "../../../../../shared/models/reply";
import {MessageService} from "../../../../../shared/services/message.service";

@Component({
  selector: 'chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.scss'],
  // encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ChatDashboardComponent implements OnInit {
    IamParticipant: Participant = null;
    message: Message;
    private room: Room;

    subscription: Subscription;
    messageSubscription: Subscription;

    constructor(
        private roomService: RoomService,
        private authService: AuthService,
        private messageService: MessageService){

    }


    ngOnInit() {
        this.subscription = this.roomService.subjectRoom.subscribe(
            (data:Room)=>{
                if (this.checkIhasRoleActive(data)) {
                    this.room = data;
                    this.setNewMessage();

                }
                // this.listOfMessage.addMessage(new Message()
                //     .setOwnerId(1)
                // )
            },
            (data)=>{}
        );
    }

    setNewMessage(){
        this.message = new Message({})
            .setStatus(MessageStatus.SEND)
            .setOwnerId(this.room.getOwner().id)
    }


    checkIhasRoleActive(data:Room) {
        let user: User = this.authService.getUser();

        this.IamParticipant = data.participant.filter((x)=>{ return x.user_id == user.id && x.role_id == Role.TYPE_ACTIVE ? x : null })[0];

        return this.IamParticipant ? true : false;
    }

    sendMessage(message: Message){
        this.messageSubscription =  this.messageService.save(message).subscribe(
            (data:Reply)=>{
                if (data.status) {
                    this.setNewMessage();
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
