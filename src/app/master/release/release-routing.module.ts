import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProjectComponent} from '../project/list-project/list-project.component';
import {ListReleaseComponent} from './list-release/list-release.component';
import {FormReleaseComponent} from './form-release/form-release.component';
import {DetailReleaseComponent} from './detail-release/detail-release.component';
import { AuthGuardService } from 'src/app/auth-guard.service';
import {ReleaseViewComponent} from './release-view/release-view.component';

const routes: Routes = [
  {
    path: '',
    component: ListReleaseComponent
  },
  {
    path: 'release-view',
    component: ReleaseViewComponent
  },
  {
    path: 'form-release',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05'
      ]
    },
    component: FormReleaseComponent
  },
  {
    path: 'form-release/:id',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05'
      ]
    },
    component: FormReleaseComponent
  },
  {
    path: 'detail-release/:id',
    component: DetailReleaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRoutingModule { }
