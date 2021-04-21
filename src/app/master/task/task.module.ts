import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import { UserTaskComponent } from './user-task/user-task.component';
import {DetailTaskComponent} from './detail-task/detail-task.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListTaskComponent } from './list-task/list-task.component';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [MyTaskComponent, UserTaskComponent, DetailTaskComponent, ListTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPaginationModule, Ng2OrderModule
    ]
})
export class TaskModule { }
