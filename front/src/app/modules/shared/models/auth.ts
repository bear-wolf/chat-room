import {debug} from "util";

export class AuthModel {
    public mode = StatusAuthorizated.Guest;

    constructor () {

    }

    setMode(mode) {
        return this.mode = mode;
    }

    getMode() {
        return mode;
    }

    is(mode) {
        return this.mode == mode ? true : false;
    }

    getInitials(){
        debugger;
        return '';
    }

}

export enum StatusAuthorizated {
    Guest = 1,
    Auth = 2
}