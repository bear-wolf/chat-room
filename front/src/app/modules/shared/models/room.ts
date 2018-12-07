import {User} from "./user";
import {Role} from "./role";
import {Participant} from "./participant";

export class Room {
    public id: number;
    public title: string = '';
    public user_id: User;
    public role_id: number;
    public participant: Participant[];
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

    getTitle() {
        return this.title || '';
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

        return size;
    }

    getStatusOwner() {
        return 'I am smile';
    }
}