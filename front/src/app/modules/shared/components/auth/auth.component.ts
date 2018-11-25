import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Subscription} from "rxjs";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {User} from "../../models/user";
import {AuthModel, StatusAuthorizated} from "../../models/auth";
import {debug} from "util";

@Component({
  selector: 'auth-panel',
  templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{
    public userModel :User;
    public authModel :AuthModel;
    StatusAuthorizated = StatusAuthorizated;

    private isAuthSubscription: Subscription;

    constructor(
        public router: Router,
        private modalService: ModalService,
        private storageService: StorageService,
        public authService: AuthService) {

        this.authModel = new AuthModel();
        this.userModel  = new User(null);
    }

    ngOnInit() {
        // this.authService.afterCheckToken().subscribe();
        this.isAuthSubscription = this.authService.isAuthenticate()
            .subscribe((data)=>{
                if (data.status) {
                    this.authModel.setMode(StatusAuthorizated.Auth);

                    this.userModel  = new User(JSON.parse(this.storageService.getAuth()));
                }
            },(data)=>{
                this.authModel.setMode(StatusAuthorizated.Guest);

                this.router.navigate(['guest']);
            });
    }
    ngOnDestroy() {
        this.isAuthSubscription.unsubscribe();
    }

    logOut(){
        this.authService.logOut().subscribe((data)=>{
            if (data.status) {
                this.storageService.removeToken(this.userModel.token);
                 this.router.navigate(['guest']);
            }
        },(data)=>{
            debugger;
            this.router.navigate(['guest']);
        });
    }

    openModal(id: string) {
        this.modalService.open(id);
    }
}