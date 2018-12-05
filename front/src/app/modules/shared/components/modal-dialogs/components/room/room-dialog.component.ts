import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../../../../ui/authorization/services/auth.service";
import {RoomService} from "../../../../services/room.service";
import {UserService} from "../../../../services/user.service";
import {RoomDialog} from "../../../../models/room-dialog";

@Component({
  selector: 'room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {
    roomDialog: RoomDialog = null;

    message: string = null;
    formObject: FormGroup;
    submitted = false;

    inviteUsers = null;
    selectedUserIds: number[];
    users = [
        {id: 'anjmao', name: 'Anjmao'},
        {id: 'varnas', name: 'Tadeus Varnas'}
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private roomService: RoomService) {
        this.formObject = this.fb.group({
            'title': [''],
            'user_id': [''],
            'inviteUsersId': ['']
        });
    }

  ngOnInit() { debugger;
        this.roomService.getInviteUsers().subscribe(
            (data)=>{
                if (data.body) {
                    this.inviteUsers = data.body;
                }
            },
            (data)=>{
                console.log(data);
            });
  }

    addCustomUser = (term) => ({id: term, name: term});

    submitForm() {
        this.submitted = true;
        let form = this.formObject.value;
        debugger

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
