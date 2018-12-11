import { Component, OnInit } from '@angular/core';
import {Reply} from "../../../shared/models/reply";
import {ProfileService} from "../../../shared/services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    message = null;
    profileFormContainer = false;
    profileBtn = 'add Profile';

    profileForm: FormGroup;
    submitted = false;
    user: User = new User(null);
    profilePicture:any;

    // profile: Profile = new Profile();

  constructor(
      private fb: FormBuilder,
      private profileService: ProfileService,
      public authService: AuthService) {

      this.profileForm = this.fb.group({
          'id': [0],
          'first_name': [''],
          'last_name': [''],
          'middle_name': [''],
          'date_create': [''],
          'date_update': [''],
      });
  }

      ngOnInit() {
            this.setDisplayName();
      }

    onCancel() {
        this.profileFormContainer = !this.profileFormContainer;
    }

    setDisplayName() {
      let user: User  = this.authService.getUser();

        if (user) {
            this.user.import(user)
          if (this.user.profile_id) {
              this.profileBtn = 'change Profile';
          }
        }
    }

    public fileChangeEvent(fileInput: any){
      debugger;
        if (fileInput.target.files && fileInput.target.files[0]) {
            var reader = new FileReader();


        }
    }

    loadFile($event, data) {
      debugger;
        let files = $event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    data = e.target.result;
                };
                reader.readAsDataURL(file);
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
