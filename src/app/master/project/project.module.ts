import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import {ProjectRoutingModule} from "./project-routing.module";



@NgModule({
  declarations: [ListProjectComponent, FormProjectComponent, DetailProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
