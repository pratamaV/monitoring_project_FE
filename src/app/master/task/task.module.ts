import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
<<<<<<< HEAD
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { BrowserModule } from '@angular/platform-browser';
import {TaskComponent} from './task.component';


@NgModule({
  declarations: [DetailTaskComponent, TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
  ]
=======
import { MyTaskComponent } from './my-task/my-task.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [MyTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule
    ]
>>>>>>> development-pull-wnt
})
export class TaskModule { }
