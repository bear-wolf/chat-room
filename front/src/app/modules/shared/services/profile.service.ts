import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get('/profile/');
  }

  getById(id: number): Observable<any> {
      return this.httpClient.get('/profile/'+id);
  }

  save(json: {}): Observable<any> {
    var id = json['id'] || '';

    return this.httpClient.post('/profile/'+id, json);
  }
}
