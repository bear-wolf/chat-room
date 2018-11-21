import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../../ui/modal/services/modal.service";

@Component({
  selector: 'remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit, AfterContentChecked {

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {

    this.modalService.isLoadedModals.subscribe(
        (data)=>{
          if (data && data['id'] == 'RemindPassword') {
              this.modalService.open('RemindPassword');
          }
        },
        (data)=>{

        });
  }

    ngAfterContentChecked() {


    }

}
