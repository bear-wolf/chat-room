import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  ],
    declarations: [
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
    ],
    exports: [

  ],
    // entryComponents:[AuthComponent]
})
export class AuthModule { }
