import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {NavigationEnd, Route, Router} from "@angular/router";
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
  }

  ngOnInit() {
      this.isAuthSubscription = this.authService.isAuthenticate().subscribe((data)=>{
        if (data.status) {
            this.router.navigate(['main'])
        }
      },(data)=>{
      });

      this.routerEvents()
  }

  routerEvents() {

      this.router.events.subscribe((data) => {
          console.log('events', data);
          if (data['routerEvent'] instanceof NavigationEnd) {
              debugger
          }
      })
  }

  ngOnDestroy() {
      this.isAuthSubscription.unsubscribe();
  }

}
