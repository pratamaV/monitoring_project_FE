import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ListProjectComponent, FormProjectComponent, DetailProjectComponent],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ProjectModule { }
