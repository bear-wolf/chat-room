import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from "./services/storage.service";

@NgModule({
    imports: [
      CommonModule,
  ],
    declarations: [
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        StorageService
    ],
    exports: [

    ],
    // entryComponents:[AuthComponent]
})
export class StorageModule { }
