import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgControl, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatTableModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        RouterModule,


    ]
})
export class HomeModule {
}
