import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthModel} from "../../../app/modules/shared/models/auth";
import {StorageService} from "../../storage/services/storage.service";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers: HttpHeaders = new HttpHeaders();

    private auth = new BehaviorSubject<AuthModel>(new AuthModel());
    public dataAuthentication = this.auth.asObservable();
    public afterCheckToken = new Subject<any>();

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
