import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
<<<<<<< HEAD
import {TaskComponent} from './task/task.component';
=======
import { DetailTaskComponent } from './task/detail-task/detail-task.component';
import { TaskComponent } from './task/task.component';
>>>>>>> origin/task

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./user/user.module').then((u) => u.UserModule)},
  {path: 'project', loadChildren: () => import('./project/project.module').then((p) => p.ProjectModule)},
<<<<<<< HEAD
  {path: 'release', loadChildren: () => import('./release/release.module').then((p) => p.ReleaseModule)},
  {path: 'task', loadChildren: () => import('./task/task.module').then((p) => p.TaskModule)}
=======
  {path: 'task', component : TaskComponent}
>>>>>>> origin/task
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
