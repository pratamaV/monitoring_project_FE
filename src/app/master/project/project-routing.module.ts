import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProjectComponent} from './form-project/form-project.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { ListProjectUserComponent } from './list-project-user/list-project-user.component';
import { DetailProjectUserComponent } from './detail-project-user/detail-project-user.component';

const routes: Routes = [
  {
    path: '',
    component: ListProjectComponent
  },
  {
    path: 'form-project',
    component: FormProjectComponent
  },
  {
    path: 'form-project/:id',
    component: FormProjectComponent
  },
  {
    path: 'detail-project',
    component: DetailProjectComponent
  },
  {
    path: 'project-user',
    component: ListProjectUserComponent
  },
  {
    path: 'detail-project-user/:id',
    component: DetailProjectUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectRoutingModule { }
