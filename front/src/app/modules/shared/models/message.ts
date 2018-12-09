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
}

export class Message {
    //from server
    public id: number;
    public owner_id: number;
    public participant_id?: number;
    public status: number;
    public description: string;
    public date_create: string;
    public date_update: string;

    //front model of data
    public role_id: string;

    constructor () {
        // if (data) {
        //     this.id = data.id;
        //     this.owner_id = data.owner_id;
        //     this.participant_id = data.participant_id;
        //     this.status = data.status;
        //     this.description = data.description;
        //     this.date_create = data.date_create;
        //     this.date_update = data.date_update;
        // }
        return this;
    }

    setOwnerId(id) {
        this.owner_id = id;

        return this;
    }

    setDescription(description) {
        this.description = description;

        return this;
    }

    setRole(id) {
        this.role_id = id;

        return this;
    }


    getInvitePicture() {
        return '';
    }

    getInviteText() {
        return ;
    }
}