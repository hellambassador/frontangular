import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }];
const routes1: Routes = [{ path: 'material', loadChildren: () => import('./material/home.module').then(m => m.HomeModule) }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes1)],
    exports: [RouterModule],

})
export class AppRoutingModule { }
