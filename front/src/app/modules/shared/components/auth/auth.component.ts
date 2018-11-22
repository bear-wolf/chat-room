import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'auth-panel',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{
    StatusAuthorizated = StatusAuthorizated;
    displayUser = '';

    public mode: StatusAuthorizated = StatusAuthorizated.Guest;
    private isAuthSubscription: Subscription;

    constructor(
        public router: Router,
        private modalService: ModalService,
        private storageService: StorageService,
        public authService: AuthService) {
    }

    ngOnInit() { debugger;
        // this.authService.afterCheckToken().subscribe();

        this.isAuthSubscription = this.authService.isAuthenticate()
            .subscribe((data)=>{
                if (data.status) {
                    this.mode = StatusAuthorizated.Auth;

                    let user:User = JSON.parse(this.storageService.getAuth());

                    this.displayUser = user.email;
                }
            },(data)=>{
                this.mode = StatusAuthorizated.Guest
                this.router.navigate(['guest']);
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