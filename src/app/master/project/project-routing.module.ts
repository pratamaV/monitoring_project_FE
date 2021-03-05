import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProjectComponent} from './form-project/form-project.component';
import { ListProjectComponent } from './list-project/list-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';

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
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectRoutingModule { }
