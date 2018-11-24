import {BehaviorSubject, Observable, Subject} from "rxjs";

export class ModalService {
    private modals: any[] = [];
    private bs_modals = new BehaviorSubject<any[]>(this.modals);

    public isLoadedModals = this.bs_modals.asObservable();
    public afterClose = new Subject();

    constructor() {
    }

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
        this.bs_modals.next(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    getById(id:string) {
        return this.modals.filter(x => x.id === id)[0];
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

        this.afterClose.next(modal);
    }

    closeAll() {
        // close modal specified by id
        for (let item of this.modals) {
            item.close();
        }
    }
}