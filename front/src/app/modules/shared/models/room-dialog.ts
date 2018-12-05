import {User} from "./user";
import {Role} from "./role";

export class RoomDialog {
    public id: number;
    public title: string = '';
    public user_id:User;

    constructor (data:RoomDialog) {
        if (data) {
            this.id = data.id;
            this.title = data.title;
            this.user_id = data.user_id;
        }
    }

    getUser(){
        return this.user_id;
    }

    getTitle() {
        return this.title
    }
}