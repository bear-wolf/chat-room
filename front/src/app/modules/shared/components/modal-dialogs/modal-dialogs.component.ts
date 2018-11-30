import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {ModelDialog} from "../../models/model-dialog";

@Component({
  selector: 'modal-dialogs',
  templateUrl: './modal-dialogs.component.html',
  styleUrls: ['./modal-dialogs.component.scss']
})
export class ModalDialogsComponent implements OnInit {
  modelDialog: ModelDialog = new ModelDialog();

  public faTimes = faTimes;

  constructor(public router: Router,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

    //@HostListener('document:click', ['$event'])

    closeModal(event, id: string) {
        if(id) {
            let modal:any = this.modalService.getById(id);

            if (modal) {
                let eRef = modal.nativeElement;
                //TODO: close  window
                if (!eRef.children[0].children[0].contains(event.target)) {
                    this.modalService.close(id);
                }
            }
        }
    }

}
