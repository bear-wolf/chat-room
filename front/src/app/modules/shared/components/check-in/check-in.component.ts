import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../ui/authorization/services/auth.service";

@Component({
  selector: 'check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
    registrationIsSuccessful = true;
    message: string = null;
    userForm: FormGroup;
    submitted = false;

    @Output() openSignInTab: EventEmitter<any> = new EventEmitter();

    constructor( private fb: FormBuilder, private authService: AuthService) {
        this.userForm = this.fb.group({
            'email': ['', Validators.required ],
            'password': ['', Validators.required ]
        });
    }

  ngOnInit() {
  }

    submitForm() {
        this.submitted = true;
        let credentials = this.userForm.value;

        if (this.userForm.valid) {
            this.authService.checkIn(credentials)
                .subscribe(
                    (data)=>{
                        if (data.status) {
                            this.message = data.message;
                            this.registrationIsSuccessful = false;
                        }
                    },
                    (data)=>{
                        this.message = data.message;
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

    clickToSignIn() {
        this.openSignInTab.emit();
    }

}
