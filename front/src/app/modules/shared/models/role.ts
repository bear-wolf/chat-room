export class Role {
    public id: number;
    public status: string;
    public description: string;
    public date_create: string;
    public date_update: string;

    constructor (data:Role) {
        if (data) {
            this.id = data.id;
            this.status = data.status;
            this.description = data.description;
            this.date_create = data.date_create;
            this.date_update = data.date_update;
        }
    }


}