import {Injectable} from '@angular/core';
import {RequestMethod, RequestOptions} from "@angular/http";
import {environment} from "../../../../environments/environment";
import {Observable, of} from "rxjs";
import {BaseService} from "./base.service";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class TranslateService  {
  host: string;

  private _currentLang: string;
  private _translations = {
    'ua': null,
    'ru': null,
    'en': null
  };

  // private data: Observable;

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor(
      public http: HttpClient,
      public baseService: BaseService) {

    this.host = environment.host;

        this.baseService.getTranslateAll().subscribe((data) => {
          if (data.length) {
              this._translations.ua = data.json();
          }
        });
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
  }

  private translate(key: string): string {
    // private perform translation
    let translation = key;
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return translation;
  }

  public instant(key: string) {
    // call translation
    return this.translate(key);
  }

  public save(translate: any) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', '*/*');

  let params = new URLSearchParams();
  for(let key in translate){
      params.set(key, translate[key])
  }

  //let options = new RequestOptions({ headers: headers});
  return this.http.post(this.host + '/translate/save', params)
      .pipe(map((res) => res['body']), catchError(error => of(null)))
  }

  public getCurrentLang() {
    if (this._currentLang === 'ua') {
      return 'uk';
    } else {
      return this._currentLang;
    }
  }
}
