import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from "./list-task/list-task.component";
import {FormTaskComponent} from "./form-task/form-task.component";
import {DetailTaskComponent} from "./detail-task/detail-task.component";
import {MyTaskComponent} from "./my-task/my-task.component";

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
  },
  {
    path: 'my-task',
    component: MyTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
