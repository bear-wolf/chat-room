import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {Reply} from "../models/reply";

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

    return this.httpClient.post('/profile/'+id, json).pipe(
        map((data:Reply) => {
            //this.setToStorage(data);
            return data;
        }))
  }

  private setToStorage(data: Reply){
      // let user:User = this.authService.getUser();
      // this.storageService.setAuth(JSON.stringify(data.body))
  }
}
