import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";

@Component({
  selector: 'remind-password-dialog',
  templateUrl: './remind-password-dialog.component.html',
  styleUrls: ['./remind-password-dialog.component.scss']
})
export class RemindPasswordDialogComponent implements OnInit {
    message: string = null;
    formObject: FormGroup;
    submitted = false;

    constructor( private fb: FormBuilder, private authService: AuthService) {
        this.formObject = this.fb.group({
            'email': ['', Validators.required ]
        });
    }

  ngOnInit() {
  }

    submitForm() {
        this.submitted = true;
        let credentials = this.formObject.value;

        if (this.formObject.valid) {
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
                this.formObject.controls['email']
                    .setErrors({ message: 'This field is not email'})
            }
        }
    }

}
