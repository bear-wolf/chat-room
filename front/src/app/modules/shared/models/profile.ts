export class Profile {
    public id: number;
    public first_name: string;
    public last_name: string;
    public picture: string;
    public middle_name: string;
    public date_create: string;
    public date_update: string;

    constructor (data?:Profile) {
        if (data) {
            this.id = data.id;
            this.first_name = data.first_name;
            this.last_name = data.last_name;
            this.picture = data.picture;
            this.middle_name = data.middle_name;
            this.date_create = data.date_create;
            this.date_update = data.date_update;
        }
    }

    getInitials() {
        let  name = '';

        if (!this.id) {
            return name;
        }

        name = this.first_name + ' ' + this.last_name.substring(0, 1).toUpperCase()  + this.middle_name.substring(0, 1).toUpperCase();

        return name;
    }

}