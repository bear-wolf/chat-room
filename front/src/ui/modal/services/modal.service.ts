import {BehaviorSubject} from "rxjs";

export class ModalService {
    private modals: any[] = [];
    private bs_modals = new BehaviorSubject<any[]>(this.modals);

    public isLoadedModals = this.bs_modals.asObservable();

    constructor() {
    }

    add(modal: any) {
        // add modal to array of active modals
        console.log('modal add', modal);
        this.modals.push(modal);
        this.bs_modals.next(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }

    close(id: string) {
        // close modal specified by id
        let modal: any = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }

    closeAll() {
        // close modal specified by id
        for (let item of this.modals) {
            item.close();
        }
    }
}