import {EnumDialogs} from "../components/modal-dialogs/enum-dialogs";

export class ModelDialog {
    public static TYPE_CREATE_ROOM_ST :string = EnumDialogs.CreateRoom;
    public static TYPE_AUTHENTICATION_ST :string = EnumDialogs.Authentication;
    public static TYPE_REMIND_PASSWORD_ST :string = EnumDialogs.RemindPassword;

    public TYPE_CREATE_ROOM :string = EnumDialogs.CreateRoom;
    public TYPE_AUTHENTICATION :string = EnumDialogs.Authentication;
    public TYPE_REMIND_PASSWORD :string = EnumDialogs.RemindPassword;

    constructor () {
    }

}