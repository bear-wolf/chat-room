import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";

export const routes: Routes = [
    { path: '', redirectTo: 'guest', pathMatch: 'full' },
    {
      path: 'guest',
      loadChildren: './modules/guest/guest.module#GuestModule'
    },
    {
      path: 'auth',
      loadChildren: './modules/main/main.module#MainModule'
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes,
        { enableTracing: false } // <-- debugging purposes only
    ) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

