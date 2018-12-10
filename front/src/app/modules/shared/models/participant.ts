import {User} from "./user";

export class Participant {
    public id: number;
    public user_id: number;
    public room_id: number;
    public role_id: number;
    public date_create: string;
    public date_update: string;

    private user:User;

    constructor (data) {
        if (data) {
            this.id = data.id;
            this.user_id = data.user_id;
            this.room_id = data.room_id;
            this.role_id = data.role_id;
            this.date_create = data.date_create;
            this.date_update = data.date_update;
        }
    }

    setUser(user:User) {
        this.user = user;

        return this;
    }

    getUser() {
        return this.user;
    }

    getProperties() {
        return {
            id: this.id,
            user_id: this.user_id,
            room_id: this.room_id,
            role_id: this.role_id,
            date_create: this.date_create,
            date_update: this.date_update
        }
    }
}