import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";
import {Router} from "@angular/router";
import {ModalService} from "../../../../../ui/modal/services/modal.service";
import {Reply} from "../../models/reply";
import {StorageService} from "../../../../../ui/storage/services/storage.service";
import {ShowHideInput} from "../../directives/show-hide-input";
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  message: string = null;
  userForm: FormGroup;
  submitted = false;
    show = false;
    faEye = faEyeSlash;

    @ViewChild(ShowHideInput) input: ShowHideInput;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private storageService: StorageService,
      private modalService: ModalService,
      private authService: AuthService) {
      this.userForm = this.fb.group({
          'email': ['', Validators.required ],
          'password': ['', Validators.required ]
      });
  }

  ngOnInit() {
      this.clearView();
  }

    toggleShow() {
        this.show = !this.show;
        if (this.show){
            this.faEye = faEye;
            this.input.changeType("text");
        }
        else {
            this.faEye = faEyeSlash;
            this.input.changeType("password");
        }
    }

  clearView() {
      this.message = null;
  }

    submitForm() {
        this.submitted = true;
        let credentials = this.userForm.value;

        if (this.userForm.valid) {
            this.authService.signIn(credentials)
                .subscribe(
                    (data: Reply)=>{
                        if (data.status) {
                            this.modalService.close('authentication');
                            this.storageService
                                .setToken(data.token)
                                .setAuth(JSON.stringify(data.body))

                            this.router.navigate(['auth']);
                        }
                    },
                    (error)=>{
                        this.message = error.message;
                    })
        } else{
            if (credentials.email.indexOf('@')<0){
                this.userForm.controls['email']
                    .setErrors({ message: 'This field is not email'})
            }
            if (credentials.password.length){
                this.userForm.controls['password']
                    .setErrors({ message: 'This field is empty'})
            }
        }
    }


    remindPassword() {
      this.modalService.closeAll();
      this.router.navigate(['guest/remind-password']);
    }

}
