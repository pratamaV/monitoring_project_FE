import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task/task.component';

const routes: Routes = [
  {path: 'user', loadChildren: () => import('./user/user.module').then((u) => u.UserModule)},
  {path: 'project', loadChildren: () => import('./project/project.module').then((p) => p.ProjectModule)},
  {path: 'release', loadChildren: () => import('./release/release.module').then((p) => p.ReleaseModule)},
  {path: 'task', loadChildren: () => import('./task/task.module').then((p) => p.TaskModule)}
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
