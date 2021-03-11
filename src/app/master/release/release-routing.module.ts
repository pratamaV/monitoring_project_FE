import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListProjectComponent} from '../project/list-project/list-project.component';
import {ListReleaseComponent} from './list-release/list-release.component';
import {FormReleaseComponent} from './form-release/form-release.component';
import {DetailReleaseComponent} from './detail-release/detail-release.component';

const routes: Routes = [
  {
    path: '',
    component: ListReleaseComponent
  },
  {
    path: 'form-release',
    component: FormReleaseComponent
  },
  {
    path: 'form-release/:id',
    component: FormReleaseComponent
  },
  {
    path: 'detail-release',
    component: DetailReleaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseRoutingModule { }
