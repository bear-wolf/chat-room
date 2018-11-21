import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'modal-dialogs',
  templateUrl: './modal-dialogs.component.html',
  styleUrls: ['./modal-dialogs.component.scss']
})
export class ModalDialogsComponent implements OnInit {

  @ViewChild('modal') public eRefModal: ElementRef;

  public faTimes = faTimes;

  constructor(public router: Router,
              private eRef: ElementRef,
              private modalService: ModalService) {

  }

  ngOnInit() {
  }

    //@HostListener('document:click', ['$event'])

    closeModal(event, id: string) {
        if(!this.eRefModal.nativeElement.contains(event.target) && id) {
            this.modalService.close(id);
        }
    }

}
