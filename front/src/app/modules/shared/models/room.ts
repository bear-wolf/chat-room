import {User} from "./user";
import {Role} from "./role";

export class Room {
    public id: number;
    public title: string = '';
    public user_id:User;
    public role_id:Role;
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
        return 'http://emilcarlsson.se/assets/louislitt.png';
    }

    getTitle() {
        return this.title
    }
}