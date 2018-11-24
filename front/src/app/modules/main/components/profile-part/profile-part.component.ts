import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {User} from "../../../shared/models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Reply} from "../../../shared/models/reply";
import {ProfileService} from "../../../shared/services/profile.service";

import {DateFormatPipe} from "ngx-moment";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

@Component({
  selector: 'profile-part',
  templateUrl: './profile-part.component.html',
  styleUrls: ['./profile-part.component.scss']
})
export class ProfilePartComponent implements OnInit {
    faUser = faUser;

  expanded = false;
  message = null;
    profileFormContainer = false;
    profileBtn = 'add Profile';

  displayName: string = '';
    initials = null;

    profileForm: FormGroup;
    submitted = false;
    user: User = null;

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      private storageService: StorageService) {

      this.profileForm = this.fb.group({
          'first_name': ['', Validators.required ],
          'last_name': ['', Validators.required ],
          'middle_name': ['', Validators.required ],
      });
  }

  ngOnInit() {

    this.setDisplayName()
  }

    setDisplayName() {
      let string = this.storageService.getAuth();

        if (string) {
            this.user = JSON.parse(string);

          if (this.user.profile_id) {
            //TOdo change it;
              this.displayName = this.user.email;
              this.profileBtn = 'change Profile';
          } else {
              this.displayName = this.user.email
              this.initials = this.user.email.substring(0, 1)+'@';
          }
        }
    }


    onChangeProfile(){
        this.profileFormContainer = !this.profileFormContainer;
    }

    saveProfileForm() {
        this.submitted = true;
        let credentials = this.profileForm.value;

        if (this.profileForm.valid) {
            let date = (new DateFormatPipe()).transform(new Date(), 'YYYY-MM-DD HH:mm');

            if (this.user.profile_id) {
                credentials.date_update = date;
            } else {
                credentials.date_create = date;
            }

            this.profileService.save(credentials)
                .subscribe(
                    (data: Reply)=>{
                        if (data.status) {
                            this.message = data.message;
                            //this.storageService
                            this.setDisplayName();
                        }
                    },
                    (error)=>{
                        this.message = error.message;
                    })
        }
    }

}
