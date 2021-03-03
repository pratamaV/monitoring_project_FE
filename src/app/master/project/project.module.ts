import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';



@NgModule({
  declarations: [ListProjectComponent, FormProjectComponent],
  imports: [
    CommonModule
  ]
})
export class ProjectModule { }
