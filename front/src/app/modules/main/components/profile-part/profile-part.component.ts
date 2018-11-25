import { Component, OnInit } from '@angular/core';
import {Reply} from "../../../shared/models/reply";
import {ProfileService} from "../../../shared/services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {User} from "../../../shared/models/user";
import {StorageService} from "../../../../../ui/storage/services/storage.service";

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
    userModel: User = new User(null);

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      public authService: AuthService) {

      this.profileForm = this.fb.group({
          'id': [0],
          'first_name': [''],
          'last_name': [''],
          'middle_name': [''],
          'picture': [''],
          'date_create': [''],
          'date_update': [''],
      });
  }

  ngOnInit() {
        this.setDisplayName();
  }

    setDisplayName() {
      let user: User  = this.authService.getUser();

        if (user) {
            this.userModel.import(user)
          if (this.userModel.profile_id) {
              this.profileBtn = 'change Profile';
          }
        }
    }


    onChangeProfile(){
        this.profileFormContainer = !this.profileFormContainer;

        let user: User = this.authService.getUser();

        if (user.profile) {
            this.profileForm.controls['id'].setValue(user.profile.id);
            this.profileForm.controls['first_name'].setValue(user.profile.first_name);
            this.profileForm.controls['last_name'].setValue(user.profile.last_name);
            this.profileForm.controls['middle_name'].setValue(user.profile.middle_name);
            this.profileForm.controls['picture'].setValue(user.profile.picture);
            this.profileForm.controls['date_create'].setValue(user.profile.date_create);
            this.profileForm.controls['date_update'].setValue(user.profile.date_update);
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
                            this.setDisplayName();
                        }
                    },
                    (error)=>{
                        this.message = error.message;
                    })
        }
    }

}
