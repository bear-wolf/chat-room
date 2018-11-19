import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ModalComponent} from "./directives/modal.component";
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalService} from "./services/modal.service";

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  ],
    declarations: [
        ModalComponent
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        ModalService
    ],
    exports: [
        ModalComponent
    ],
    // entryComponents:[AuthComponent]
})
export class ModalModule { }
