import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.scss'],
  // encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ChatDashboardComponent implements OnInit {

    constructor(){
    }


    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
