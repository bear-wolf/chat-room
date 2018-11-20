import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.scss']
})
export class AuthenticationDialogComponent implements OnInit {
  CurrentPanel = CurrentPanel;
  mode: CurrentPanel = CurrentPanel.SignIn;

  constructor(public router: Router) {

  }

  ngOnInit() {
  }

    openTab(id: CurrentPanel) {
        this.mode = id;
    }

}


enum CurrentPanel {
    SignIn = 1,
    CheckIn = 2
}
