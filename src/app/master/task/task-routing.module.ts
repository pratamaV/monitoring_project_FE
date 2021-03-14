<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTaskComponent } from './detail-task/detail-task.component';
=======
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './list-task/list-task.component';
import {FormTaskComponent} from './form-task/form-task.component';
import {DetailTaskComponent} from './detail-task/detail-task.component';
import {MyTaskComponent} from './my-task/my-task.component';
>>>>>>> development-pull-wnt


const routes: Routes = [
  {
    path: 'detail',
    component: DetailTaskComponent
  },
<<<<<<< HEAD
=======
  {
    path: 'my-task',
    component: MyTaskComponent
  }
];
>>>>>>> development-pull-wnt

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
