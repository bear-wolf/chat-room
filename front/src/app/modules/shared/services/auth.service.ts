import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

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
