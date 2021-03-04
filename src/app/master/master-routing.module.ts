import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task/task.component';

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./user/user.module').then((u) => u.UserModule)},
  {path: 'project', loadChildren: () => import('./project/project.module').then((p) => p.ProjectModule)},
  {path: 'task', component: TaskComponent}
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
