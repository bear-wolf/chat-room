export class User {
    public id: number;
    public email: string = 'e!';
    public password: string;
    public role_id: number;
    public profile_id: number;
    public date_create: string;
    public date_update: string;

    public token: string;

    constructor () {
    }

    getDisplayName() {
        let  name = '';

        if (!this.id) {
            return name;
        }

        if (!this.profile_id) {
            name = this.email;
        }

        return name;
    }

    importStorage(data){
        data = JSON.parse(data);

        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
        this.role_id = data.role_id;
        this.profile_id = data.profile_id;
        this.date_create = data.date_create;
        this.date_update = data.date_update;
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