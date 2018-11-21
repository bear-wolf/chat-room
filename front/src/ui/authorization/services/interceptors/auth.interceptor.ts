import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/index';
import {StorageService} from "../../../storage/services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public storage: StorageService) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const options: { url?: string, setHeaders?: any } = {};

        const token = this.storage.getToken();

        const headers: {
            'Content-Type': string,
            'Authorization'?: string
        } = { 'Content-Type': 'application/json' };

        if (token) {
            headers['Authorization'] = 'Bearer '+token;

            options.setHeaders = headers;
        }

        request = request.clone(options);
        return next.handle(request);
    }
}
