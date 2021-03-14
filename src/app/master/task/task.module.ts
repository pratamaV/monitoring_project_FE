import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [MyTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule
    ]
})
export class TaskModule { }
