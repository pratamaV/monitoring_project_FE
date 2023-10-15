import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';


const routes: Routes = [
  {
    path: 'user',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '04',
        '05',
      ]
    },
    loadChildren: () => import('./user/user.module').then(u => u.UserModule)
  },
  {
    path: 'project',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05',
      ]
    },
    loadChildren: () =>
      import('./project/project.module').then(p => p.ProjectModule)
  },
  {
    path: 'release',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05',
      ]
    },
    loadChildren: () =>
      import('./release/release.module').then(p => p.ReleaseModule)
  },
  {
    path: 'task',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '04',
        '05',
      ]
    },
    loadChildren: () => import('./task/task.module').then(p => p.TaskModule)
  },
  {
    path: 'issued',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05',
      ]
    },
    loadChildren: () =>
      import('./issued/issued.module').then(p => p.IssuedModule)
  },
  {
    path: 'training',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '05',
      ]
    },
    loadChildren: () =>
      import('./training/training.module').then(p => p.TrainingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
