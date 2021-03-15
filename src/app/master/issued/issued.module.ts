import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuedRoutingModule } from './issued-routing.module';
import { FormIssuedComponent } from './form-issued/form-issued.component';
import { ListIssuedComponent } from './list-issued/list-issued.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "../../layout/sidebar/sidebar.module";


@NgModule({
  declarations: [FormIssuedComponent, ListIssuedComponent],
    imports: [
        CommonModule,
        IssuedRoutingModule,
        ReactiveFormsModule,
        SidebarModule
    ]
})
export class IssuedModule { }
