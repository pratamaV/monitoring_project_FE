import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import {ListReleaseComponent} from "../release/list-release/list-release.component";
import {FormReleaseComponent} from "../release/form-release/form-release.component";
import {DetailReleaseComponent} from "../release/detail-release/detail-release.component";
import {ListTaskComponent} from "./list-task/list-task.component";
import {FormTaskComponent} from "./form-task/form-task.component";
import {DetailTaskComponent} from "./detail-task/detail-task.component";

const routes: Routes = [

  {
    path: '',
    component: ListTaskComponent
  },
  {
    path: 'form-task',
    component: FormTaskComponent
  },
  {
    path: 'form-task/:id',
    component: FormTaskComponent
  },
  {
    path: 'detail-task',
    component: DetailTaskComponent
  }
];

=======
import { Routes, RouterModule } from '@angular/router';
import { DetailTaskComponent } from './detail-task/detail-task.component';


const routes: Routes = [
  {
    path: 'detail',
    component: DetailTaskComponent
  },

];


>>>>>>> origin/task
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
=======

>>>>>>> origin/task
export class TaskRoutingModule { }
