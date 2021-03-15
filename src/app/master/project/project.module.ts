import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListProjectUserComponent } from './list-project-user/list-project-user.component';
import { DetailProjectUserComponent } from './detail-project-user/detail-project-user.component';
import {SidebarModule} from "../../layout/sidebar/sidebar.module";



@NgModule({
  declarations: [ListProjectComponent, FormProjectComponent, DetailProjectComponent, ListProjectUserComponent, DetailProjectUserComponent],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule
    ]
})
export class ProjectModule { }
