import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable , of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class BaseService {
  host;

  constructor(
      protected httpClient: HttpClient,
      headers?: Headers
  ) {
    this.host = environment.host;
  }

  getTranslateAll(): Observable<any> {
    let headers;
    headers = new HttpHeaders();
    // switch (window.location.hash) {
    //   // case '#ru': { headers.append('Accept-Language', 'ru'); break; }
    //   // case '#uk': { headers.append('Accept-Language', 'uk'); break; }
    //   // case '#en': { headers.append('Accept-Language', 'en'); break; }
    //   default: {
    //     headers.append('Accept-Language', 'uk');
    //     break;
    //   }
    // }

    headers.append('Accept-Language', 'uk');

    // return this.http.get(this.host + '/translate', {
    //   headers: headers
    // });

    return of([]);
  }

  getContent(key: string) {
      let headers = new HttpHeaders();

      headers.append('Accept', 'application/json');

      return this.httpClient.get(this.host + '/content-pages/' + key, {
          headers: headers
      }).pipe(map((res) => res['body']), catchError(error => of(null)))
  }

}
