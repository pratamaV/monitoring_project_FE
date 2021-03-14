import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { BrowserModule } from '@angular/platform-browser';
import {TaskComponent} from './task.component';


@NgModule({
  declarations: [DetailTaskComponent, TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
  ]
})
export class TaskModule { }
