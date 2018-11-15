import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any> {
    return this.httpClient.get('/role/');
  }

  getById(id: number): Observable<any> {
      return this.httpClient.get('/role/'+id);
  }

  save(json: {}): Observable<any> {
    var id = json['id'] || '';

    return this.httpClient.post('/role/'+id, json);
  }

  remove(json: {}): Observable<any> {
      var id = json['id'];

      return this.httpClient.post('/role/'+id, {});
  }
}
