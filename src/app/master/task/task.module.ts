import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import { UserTaskComponent } from './user-task/user-task.component';


@NgModule({
  declarations: [MyTaskComponent, UserTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        SidebarModule
    ]
})
export class TaskModule { }
