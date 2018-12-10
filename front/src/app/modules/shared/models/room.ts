import {User} from "./user";
import {Role} from "./role";
import {Participant} from "./participant";
import {ChatMessageComponent} from "../../main/components/chat-panel/components/chat-message/chat-message.component";
import {Message} from "./message";

export class Room {
    public id: number;
    public title: string = '';
    public user_id: User;
    public role_id: number;
    public participant: Participant[] = [];
    public owner: User;
    public message: Message[];
    public date_create: string;
    public date_update: string;

    constructor (data:Room) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.user_id = data.user_id;
            this.role_id = data.role_id;
            this.date_create = data.date_create;
            this.date_update = data.date_update;
            this.owner = data.owner ? new User(data.owner) : null;
        }
    }

    getPicture(){
        return this.getFontIcon(); //'http://emilcarlsson.se/assets/mikeross.png';
    }

    private getFontIcon() {
        return '<i class="fa fa-user fa-fw" aria-hidden="true"></i>';
    }

    getInvite(): string{
        return this.role_id == Role.TYPE_INVITED ? 'invited' : '';
    }

    getUserById(id: number) {
        let user: any = this.participant.filter((x)=>{ x.id == id});

        return user.length ? user : this.owner;
    }

    getTitle() {
        return this.title || '';
    }
    getOwner() {
        return this.owner;
    }
    setOwner(user: User) {
        this.owner = user;

        return this;
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

    addParticipant(item:Participant){
        this.participant = this.participant || [];

        if (item) {
            this.participant.push(item);
        }

        return this;
    }

    getCountParticipants() {
        var size = this.participant ? this.participant.length : 0;

        return ++size; // + owner the room
    }

    getStatusOwner() {
        return 'I am smile';
    }
}