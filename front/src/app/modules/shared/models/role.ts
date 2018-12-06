export class Role {
    public static TYPE_GUEST = 1; // не розпізнаваний системою
    public static TYPE_DEMO = 2; // зайшов як гість (авторизований)
    public static TYPE_CHECK_IN = 3; //зареєструвався
    public static TYPE_ACTIVE = 4; //авторизувався / підтвердив участь
    public static TYPE_INVITED = 5; //Запрошений

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