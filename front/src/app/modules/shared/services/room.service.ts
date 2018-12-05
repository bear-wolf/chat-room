import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get('/room/');
  }

  getById(id: number): Observable<any> {
      return this.httpClient.get('/room/'+id);
  }

  save(json: {}): Observable<any> {
    var id = json['id'] || '';

    return this.httpClient.post('/room/'+id, json);
  }

  remove(json: {}): Observable<any> {
      var id = json['id'];

      return this.httpClient.post('/room/'+id, {});
  }

  getInviteUsers(): Observable<any> {
      return this.httpClient.get('/invite-users/');
  }
}
