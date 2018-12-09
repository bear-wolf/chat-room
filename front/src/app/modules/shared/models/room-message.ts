import {User} from "./user";
import {Role} from "./role";
import {Participant} from "./participant";
import {ChatMessageComponent} from "../../main/components/chat-panel/components/chat-message/chat-message.component";
import {Message} from "./message";

export class RoomMessage {
    public message: Message[];


    constructor () {

    }

    addMessage(item: Message){
        this.message = this.message || [];

        if (item) {
            this.message.push(item);
        }

        return this;
    }
    removeMessage(item: Message){
        this.message = this.message || [];

        if (item) {
            this.message = this.message.slice(1);
        }

        return this;
    }
}