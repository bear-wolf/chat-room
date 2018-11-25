import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {User} from "../../../shared/models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Reply} from "../../../shared/models/reply";
import {ProfileService} from "../../../shared/services/profile.service";

import {DateFormatPipe} from "ngx-moment";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";

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

    profileForm: FormGroup;
    submitted = false;
    userModel: User = new User();

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      public authService: AuthService) {

      this.profileForm = this.fb.group({
          'first_name': [''],
          'last_name': [''],
          'middle_name': [''],
          'picture': [''],
      });
  }

  ngOnInit() {
    this.setDisplayName()
      console.log(this.authService.getUser().getDisplayName());
  }

    setDisplayName() {
      let user: User  = this.authService.getUser();

        if (user) {
            this.userModel.importStorage(user)
          if (this.userModel.profile_id) {
              this.profileBtn = 'change Profile';
          }
        }
    }


    onChangeProfile(){
        this.profileFormContainer = !this.profileFormContainer;

        let user: User = this.authService.getUser();

        if (user.profile) {
            this.profileForm.controls['first_name'].setValue(user.profile.first_name);
            this.profileForm.controls['last_name'].setValue(user.profile.last_name);
            this.profileForm.controls['middle_name'].setValue(user.profile.middle_name);
            this.profileForm.controls['picture'].setValue(user.profile.picture);
        }
    }

    saveProfileForm() {
        this.submitted = true;
        let credentials = this.profileForm.value;

        if (this.profileForm.valid) {
            credentials.user_id = this.authService.getUser().id;

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
