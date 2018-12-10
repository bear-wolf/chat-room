import {User} from "./user";

export class MessageInvite {
    description = 'Your invite users: ';
    user: User;

    constructor (user: User) {
        this.user = user;

        return this;
    }

    getDescription() {
        return this.description + this.user.email;
    }

    getPicture() {
        var r;

        if (this.user) {
            r = this.user.getPicture();
        } else {
            r = '';
        }
        return r;
    }
}

export const MessageStatus = {
    READ: 1,
    NOTREAD: 2,
    SEND: 3
}

export class Message{
    //from server
    public id: number;
    public owner_id: number;
    public participant_id?: number;
    public room_id: number;
    public status: number;
    public description: string = '';
    public date_create: string;
    public date_update: string;

    constructor (data) {
        if (data) {
            this.id = data.id;
            this.owner_id = data.owner_id;
            this.participant_id = data.participant_id;
            this.status = data.status;
            this.description = data.description || '';
            this.date_create = data.date_create;
            this.date_update = data.date_update;
        }

        return this;
    }

    setOwnerId(id) {
        this.owner_id = id;

        return this;
    }

    setStatus(status){
        this.status = status;
        return this;
    }
    setRoomId(id){
        this.room_id = id;

        return this;
    }

    setDescription(description) {
        this.description = description;

        return this;
    }
}