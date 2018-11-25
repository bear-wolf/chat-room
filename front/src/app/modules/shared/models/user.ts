import {Profile} from "./profile";

export class User {
    public id: number;
    public email: string = 'e!';
    public password: string;
    public role_id: number;
    public profile_id: number;
    public profile: Profile = null;
    public date_create: string;
    public date_update: string;

    public token: string;

    constructor (data: User) {
        if (data) {
            this.id = data.id;
            this.email = data.email;
            this.password = data.password;
            this.role_id = data.role_id;
            this.profile_id = data.profile_id;
            this.date_create = data.date_create;
            this.date_update = data.date_update;

            if (data.profile) {
                this.profile = new Profile(data.profile)
            }
        }
    }

    getDisplayName() { console.log('getDisplayName');
        let  name = '';

        if (!this.id) {
            return name;
        }

        if (!this.profile) {
            name = this.email;
        } else {
            name = this.profile.getInitials()
        }

        return name;
    }

    getProfile() {
        return this.profile;
    }

    import(data:User){
        this.constructor(data);

        return this;
    };

    getInitials() {
        let  name = '@';

        if (!this.id) {
            return name;
        }

        if (!this.profile_id) {
            name = this.email.substring(0, 1)+'@';
        }

        return name;
    }

}