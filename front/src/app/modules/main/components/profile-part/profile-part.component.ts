import { Component, OnInit } from '@angular/core';
import {Reply} from "../../../shared/models/reply";
import {ProfileService} from "../../../shared/services/profile.service";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {User} from "../../../shared/models/user";
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {Profile} from "../../../shared/models/profile";
import {debug} from "util";

@Component({
  selector: 'profile-part',
  templateUrl: './profile-part.component.html',
  styleUrls: ['./profile-part.component.scss']
})
export class ProfilePartComponent implements OnInit {
    expanded = false;
    message = null;
    profileFormContainer = false;
    profileBtn = 'add Profile';

    profileForm: FormGroup;
    submitted = false;

    user:User;

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      private storageService: StorageService,
      public authService: AuthService) {

      this.user = new User(this.authService.getUser());

      this.profileForm = this.fb.group({
          'id': [0],
          'first_name': ['', Validators.required],
          'last_name': ['', Validators.required],
          'middle_name': ['', Validators.required],
      });
  }

      ngOnInit() {
            this.setDisplayName();
      }

    setDisplayName() {
        if (this.user) {
          if (this.user.profile_id) {
              this.profileBtn = 'Update';
          }
        }
    }

    loadFile($event) {
        if (!this.user.profile_id) {
            this.user.profile = new Profile();
        }

        let files = $event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.user.profile.picture = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }
    }


    onSetProfile(){
        this.expanded = !this.expanded; debugger;

        let user: User = this.authService.getUser();

        if (user.profile) {
            this.profileForm.controls['id'].setValue(user.profile.id);
            this.profileForm.controls['first_name'].setValue(user.profile.first_name);
            this.profileForm.controls['last_name'].setValue(user.profile.last_name);
            this.profileForm.controls['middle_name'].setValue(user.profile.middle_name);
            //let bufferOriginal = new Buffer.from(user.profile.picture);
            //this.profileForm.controls['picture'].setValue();
        }

        return false;
    }

    isError(param) {
      let r: boolean,
          control = this.profileForm.controls[param];

      r = this.submitted && control.errors && control.errors.required ? true : false;

      return r;
    }

    saveProfileForm() {
        this.submitted = true;
        let credentials = this.profileForm.value;
        console.log('profile save');

        if (this.profileForm.valid) {
            credentials.user_id = this.authService.getUser().id;
            credentials.picture = this.user.profile.picture;

            this.profileService.save(credentials)
                .subscribe(
                    (data: Reply)=>{
                        if (data.status) {
                            let user: User = this.authService.getUser();

                            this.expanded = !this.expanded;
                            user.setProfile(<Profile>data.body[0]);

                            this.authService.saveDataUser(user);
                            this.setDisplayName();
                        }
                    },
                    (error)=>{
                        this.message = error.message;
                    })
        }
    }

}
