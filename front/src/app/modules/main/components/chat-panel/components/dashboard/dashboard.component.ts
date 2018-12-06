import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Layout, ModeLayout} from "../models/layout";
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'layout',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class DashboardComponent implements OnInit {

    constructor(){
    }


    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
