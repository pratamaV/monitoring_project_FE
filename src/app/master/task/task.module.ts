import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import { DetailTaskComponent} from './detail-task/detail-task.component';
import { FormTaskComponent } from './form-task/form-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MyTaskComponent, DetailTaskComponent, FormTaskComponent, ListTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule
    ]
})
export class TaskModule { }
