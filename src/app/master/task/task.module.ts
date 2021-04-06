import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import { UserTaskComponent } from './user-task/user-task.component';
import {DetailTaskComponent} from './detail-task/detail-task.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MyTaskComponent, UserTaskComponent, DetailTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPaginationModule
    ]
})
export class TaskModule { }
