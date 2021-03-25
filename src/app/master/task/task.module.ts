import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { TaskRoutingModule } from './task-routing.module';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [DetailTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
  ]
})
export class TaskModule { }
=======

import { TaskRoutingModule } from './task-routing.module';
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "../../layout/sidebar/sidebar.module";
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
>>>>>>> development-pull-wnt
