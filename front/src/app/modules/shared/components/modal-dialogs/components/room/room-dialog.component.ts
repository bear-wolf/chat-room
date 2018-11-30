import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";
import {RoomService} from "../../../../services/room.service";

@Component({
  selector: 'room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
    message: string = null;
    formObject: FormGroup;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private roomService: RoomService) {
        this.formObject = this.fb.group({
            'title': [''],
            'user_id': ['']
        });
    }

  ngOnInit() {
  }

    submitForm() {
        this.submitted = true;
        let form = this.formObject.value;

        if (this.formObject.valid) {
            form.user_id = this.authService.getUser().getId();

            this.roomService.save(form)
                .subscribe(
                    (data)=>{
                        debugger
                    },
                    (error)=>{
                        this.message = error.message;
                    })
        } else{
            // if (form.email.indexOf('@')<0){
            //     this.formObject.controls['email']
            //         .setErrors({ message: 'This field is not email'})
            // }
        }
    }

}
