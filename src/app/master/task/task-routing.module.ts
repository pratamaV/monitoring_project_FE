import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTaskComponent} from './list-task/list-task.component';
import {FormTaskComponent} from './form-task/form-task.component';
import {DetailTaskComponent} from './detail-task/detail-task.component';
import {MyTaskComponent} from './my-task/my-task.component';
import { AuthGuardService } from 'src/app/auth-guard.service';

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
    component: ListTaskComponent
  },
  {
    path: 'form-task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
      ]
    },
    component: FormTaskComponent
  },
  {
    path: 'form-task/:id',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
      ]
    },
    component: FormTaskComponent
  },
  {
    path: 'detail-task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
      ]
    },
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
