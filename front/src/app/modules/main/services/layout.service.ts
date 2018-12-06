import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Layout, ModeLayout} from "../components/models/layout";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public subjectMode = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  remove(json: {}): Observable<any> {
      var id = json['id'];

      return this.httpClient.post('/role/'+id, {});
  }

    setMode(mode: ModeLayout) {
        this.subjectMode.next({
            mode: mode
        })
        return;
    }

}
