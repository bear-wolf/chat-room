import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../../shared/services/room.service";
import {Reply} from "../../../shared/models/reply";
import {Room} from "../../../shared/models/room";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {EnumDialogs} from "../../../shared/components/modal-dialogs/enum-dialogs";

@Component({
  selector: 'contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.scss']
})
export class ContactPanelComponent implements OnInit, OnDestroy{
    listOfRoom: [Room] = null;

    constructor(private roomService: RoomService,
                private modalService: ModalService) {

    }


    onAddChat() {
        this.modalService.open(EnumDialogs.CreateRoom);
    }

    ngOnInit(): void {
        this.roomService.get().subscribe(
        (data: Reply)=>{
            debugger;

        }, (data: Reply)=>{

        })
    }

    ngOnDestroy(): void {
    }
}
