import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-part',
  templateUrl: './profile-part.component.html',
  styleUrls: ['./profile-part.component.scss']
})
export class ProfilePartComponent implements OnInit {
  expanded = false;

  constructor() { }

  ngOnInit() {
  }

}
