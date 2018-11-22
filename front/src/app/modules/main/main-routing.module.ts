import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class MainRoutingModule { }
