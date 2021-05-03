

import{ NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { FormUserComponent } from './form-user/form-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import {UserRoutingModule} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "../../layout/sidebar/sidebar.module";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [DetailUserComponent, FormUserComponent, ListUserComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class UserModule { }
