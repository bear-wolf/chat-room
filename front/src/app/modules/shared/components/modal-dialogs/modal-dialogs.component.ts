import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "../../../../../ui/modal/services/modal.service";

@Component({
  selector: 'modal-dialogs',
  templateUrl: './modal-dialogs.component.html',
  styleUrls: ['./modal-dialogs.component.scss']
})
export class ModalDialogsComponent implements OnInit {

  constructor(public router: Router,
              private modalService: ModalService) {

  }

  ngOnInit() {
  }

    openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

}