import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

import { TaskRoutingModule } from './task-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
=======
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
>>>>>>> origin/task
