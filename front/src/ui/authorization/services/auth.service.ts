import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthModel} from "../../../app/modules/shared/models/auth";
import {StorageService} from "../../storage/services/storage.service";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {User} from "../../../app/modules/shared/models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers: HttpHeaders = new HttpHeaders();

    private userModel: User;

    public afterCheckToken = new Subject<any>();
    public userData = new Subject<any>();

    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService) {
    }

    isAuthenticate(): Observable<any> {
        let token = this.storageService.getToken();

        var observer = new Observable((observer)=>{
            const {error} = observer;

            if (!token) {
                error({
                    status: false,
                    message: 'Token old'
                })
            }
        });

        if (token) {

            observer = this.httpClient.post('/is-auth/', {}, )
                .pipe(map((data) => {
                        this.afterCheckToken.next(data);
                        return data;
                    }),
                      catchError((error) => {
                          this.afterCheckToken.error(error);
                          return error;
                      }));
        }

        return observer;
    }

    signIn(body: {}): Observable<any> {
        return this.httpClient.post('/sign-in/', body);
    }

    remindPassword(body: {}): Observable<any> {
        return this.httpClient.post('/remind-password/', body);
    }

    saveDataUser(user:User) {
        this.storageService.setAuth(JSON.stringify(user));
        this.userData.next(user);
    }

    getUser(): User {
        let user;

        if (!this.userModel) {
            this.userModel  = new User(JSON.parse(this.storageService.getAuth()));

            user = this.userModel;
        } else {
            user = this.userModel;
        }

        return user;
    }

    logOut(): Observable<any> {
        return this.httpClient.get('/log-out/');
    }

    //registry
    checkIn(body: {}): Observable<any> {
        debugger
        return this.httpClient.post('/check-in/', body);
        //return this.httpClient.post('http://localhost:3200/check-in/', body);
    }
}
