export enum ModeLayout {
    VIEW_HOME = 'home',
    VIEW_CHAT = 'chat',
}

export class Layout {
    public mode: ModeLayout;

    constructor () {
    }

    // getMode() {
    //     return this.mode;
    // }

    setMode(mode){
        this.mode = mode;

        return this;
    }

    isModeHome() {
        return this.mode == ModeLayout.VIEW_HOME ? true : false;
    }

    isModeChat() {
        return this.mode == ModeLayout.VIEW_CHAT ? true : false;
    }

}