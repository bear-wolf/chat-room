import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  message: string = null;
  userForm: FormGroup;
  submitted = false;

  constructor( private fb: FormBuilder, private authService: AuthService) {
      this.userForm = this.fb.group({
          'email': ['', Validators.required ],
          'password': ['', Validators.required ]
      });
  }

  ngOnInit() {
      this.clearView();
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
                  (data)=>{
                    debugger
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

}
