import {Component, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Layout, ModeLayout} from "../models/layout";
import {LayoutService} from "../../services/layout.service";
import {WebSocketService} from "../../../../../ui/web-socket/websocket.service";

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class LayoutComponent implements OnInit {
    layout: Layout = new Layout().setMode(ModeLayout.VIEW_HOME);

    constructor(
        public router: Router,
        // @Optional() public webSocketService: WebSocketService,
        public layoutService: LayoutService,
        public authService: AuthService) {
    }

    ngOnInit() {
        this.layoutService.subjectMode.subscribe(
            (data)=>{
                if (data.mode) {
                    this.layout.setMode(data.mode);
                }
            },
            (data)=>{

            });
    }

    ngOnDestroy() {
    }

}
