import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../../ui/modal/services/modal.service";

@Component({
  selector: 'auth-panel',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
    public mode: StatusAuthorizated = StatusAuthorizated.Guest;
    private isAuthSubscription: Subscription;

    constructor(
        public router: Router,
        private modalService: ModalService,
        public authService: AuthService) {
    }

    ngOnInit() {
        this.isAuthSubscription = this.authService.isAuthenticate().subscribe((data)=>{
            if (data.status) {
                this.mode = StatusAuthorizated.Auth
            }
        },(data)=>{
            this.mode = StatusAuthorizated.Guest
        });
    }

    ngOnDestroy() {
        this.isAuthSubscription.unsubscribe();
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    openTab(step) {

    }
}

export enum StatusAuthorizated {
  Guest = 1,
  Auth = 2
}