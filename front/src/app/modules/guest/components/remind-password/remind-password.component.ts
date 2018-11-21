import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterEvent} from "@angular/router";

@Component({
  selector: 'remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  constructor(
      private modalService: ModalService,
      private activatedRoute: ActivatedRoute,
      private router: Router) {

  }

  ngOnInit() {
    this.modalService.isLoadedModals.subscribe(
        (data)=>{
          if (data && data['id'] == 'RemindPassword' && this.router.url.indexOf('remind-password') > 0) {
              this.openModal();
          }
        },
        (data)=>{

        });

    this.routerEvents();
  }

  openModal(){
      this.modalService.afterClose.subscribe((data)=>{
          if (data && data['id'] == 'RemindPassword') {
              this.router.navigate(['']);
          }
      });
      this.modalService.open('RemindPassword');
  }

    routerEvents() {
        this.router.events.subscribe((data) => {
            if (this.router.url.indexOf('remind-password') > 0 ) {
                this.openModal();
            }
        })
    }
}
