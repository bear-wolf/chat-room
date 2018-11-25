import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(
        public router: Router,
        public authService: AuthService) {
    }


    ngOnInit() {

  }

    ngOnDestroy() {
    }

}
