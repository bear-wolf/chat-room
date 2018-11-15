import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get('/message/');
  }

  getById(id: number): Observable<any> {
      return this.httpClient.get('/message/'+id);
  }

  save(json: {}): Observable<any> {
    var id = json['id'] || '';

    return this.httpClient.post('/message/'+id, json);
  }

  remove(json: {}): Observable<any> {
      var id = json['id'];

      return this.httpClient.post('/message/'+id, {});
  }
}
