import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'event-list', pathMatch: 'full'
  //
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class MainRoutingModule { }
