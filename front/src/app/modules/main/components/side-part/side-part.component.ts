import { Component, OnInit } from '@angular/core';
import {ModelDialog} from "../../../shared/models/model-dialog";
import {ModalService} from "../../../../../ui/modal/services/modal.service";

@Component({
  selector: 'side-part',
  templateUrl: './side-part.component.html',
  styleUrls: ['./side-part.component.scss']
})
export class SidePartComponent implements OnInit {

  constructor(private modalService: ModalService) {

  }

  ngOnInit() {
  }

    onAddChat() {
        this.modalService.open(ModelDialog.TYPE_CREATE_ROOM_ST);
    }

}
