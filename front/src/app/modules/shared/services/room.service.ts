import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Room} from "../models/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public subjectRoom = new Subject<Room>();

  constructor(private httpClient: HttpClient) { }

    setRoom(data: Room) {
        this.subjectRoom.next(data);

        return this;
    }

  get(): Observable<any> {
    return this.httpClient.get('/room/');
  }

  getById(id: number): Observable<any> {
      return this.httpClient.get('/room/'+id);
  }

    getByOwnerAndParticipant(json: {}): Observable<any> {
        let body = json || {};

        return this.httpClient.post('/room/has-user/', body);
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
      return this.httpClient.get('/room/invite-users');
  }
}
