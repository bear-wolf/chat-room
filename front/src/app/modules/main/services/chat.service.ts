import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Layout, ModeLayout} from "../components/models/layout";
import {Room} from "../../shared/models/room";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public subjectRoom = new Subject<Room>();

  constructor(private httpClient: HttpClient) { }

  remove(json: {}): Observable<any> {
      var id = json['id'];

      return this.httpClient.post('/role/'+id, {});
  }

    setRoom(data: Room) {
        console.log('In room', data);
        this.subjectRoom.next(data);

        return this;
    }

}
