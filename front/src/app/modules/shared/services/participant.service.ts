import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get('/participant/');
  }

  getInvited(json: {}): Observable<any> {
      let body = json || {};

      return this.httpClient.post('/participant/invited/', body);
  }

  save(json: {}): Observable<any> {
    var id :string = json['id'] || '';

    return this.httpClient.post('/participant/'+id, json);
  }

  remove(json: {}): Observable<any> {
      let id :string = json['id'];

      return this.httpClient.post('/participant/'+id,{});
  }
}
