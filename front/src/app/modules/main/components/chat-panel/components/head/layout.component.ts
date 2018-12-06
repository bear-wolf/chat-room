import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Layout, ModeLayout} from "../models/layout";
import {LayoutService} from "../../services/layout.service";

@Component({
  selector: 'layout',
  templateUrl: './head.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class LayoutComponent implements OnInit {

    constructor(){
    }


    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
