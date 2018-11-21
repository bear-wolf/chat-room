import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/index';
import {environment} from "../../../../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class RequestInterceptor implements HttpInterceptor {
    constructor() {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const options: { url?: string, setHeaders?: any } = {};

        options.url = environment.host + request.url;

        request = request.clone(options);
        return next.handle(request);
    }
}
