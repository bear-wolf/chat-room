import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../ui/authorization/services/auth.service";
import {Route, Router} from "@angular/router";
import {Subscribable, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit, OnDestroy {
  private isAuthSubscription: Subscription;

  constructor(
      public router: Router,
      public authService: AuthService) {
        debugger;
  }

  ngOnInit() {
      this.isAuthSubscription = this.authService.isAuthenticate().subscribe((data)=>{
        debugger;
        if (data.status) {
            this.router.navigate(['main'])
        }
      },(data)=>{
      });
  }

  ngOnDestroy() {
      this.isAuthSubscription.unsubscribe();
  }

}
