import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthModel} from "../models/auth";
import {StorageService} from "./storage.service";
import {UserModel} from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers: HttpHeaders = new HttpHeaders();

    private auth = new BehaviorSubject<AuthModel>(new AuthModel());
    public dataAuthentication = this.auth.asObservable();

    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService) {
    }

    updateAuthentication(data: AuthModel){
        return this.auth.next(data);
    }

    isAuthenticate(): Observable<any> {
        let user: UserModel = JSON.parse(this.storageService.getAuth() || '{}'),
            token = user && user.token;

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
            this.headers.append('Content-Type', 'application/json');
            this.headers.append('Authorization', 'Bearer ' + token);

            observer = this.httpClient.post('/is-auth/', {}, {headers: this.headers});
        }

        return observer;
    }

    signIn(body: {}): Observable<any> {
        return this.httpClient.post('/sign-in/', body);
    }

    signOut(body: {}): Observable<any> {
        return this.httpClient.get('/sign-in/', body);
    }

    //registry
    checkIn(body: {}): Observable<any> {
        return this.httpClient.post('/check-in/', body);
    }
}
