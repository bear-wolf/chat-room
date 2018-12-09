import {Component, OnInit, ViewEncapsulation, ɵRenderDebugInfo} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {Message, MessageInvite} from "../../../../../shared/models/message";
import {ChatService} from "../../../../services/chat.service";
import {RoomMessage} from "../../../../../shared/models/room-message";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";
import {Room} from "../../../../../shared/models/room";
import {User} from "../../../../../shared/models/user";
import {Participant} from "../../../../../shared/models/participant";
import {Role} from "../../../../../shared/models/role";

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
    listOfMessage: RoomMessage = null;

    invited: MessageInvite = null;

    constructor(
        private authService: AuthService,
        private chatService: ChatService){
        this.listOfMessage = new RoomMessage();
    }


    ngOnInit() {
        this.chatService.subjectRoom.subscribe(
            (data)=>{
                this.checkIamInvite(data);
                // this.listOfMessage.addMessage(new Message()
                //     .setOwnerId(1)
                // )
            },
            (data)=>{}
        );
    }

    checkIamInvite(data:Room) {
        let participant: Participant,
            user: User = this.authService.getUser();
        debugger;
        participant = data.participant.filter((x)=>{ return x.user_id == user.id && x.role_id == Role.TYPE_INVITED ? x : null })[0];

        if (participant) {
            this.invited = new MessageInvite(data.owner);
        }
    }

    ngOnDestroy() {
    }

}
