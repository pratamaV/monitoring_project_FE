import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent} from './form-user/form-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';


const routes: Routes = [
  {
    path: '',
    component: ListUserComponent
  },
  {
    path: 'form-user',
    component: FormUserComponent
  },
  {
    path: 'form-user/:id',
    component: FormUserComponent
  },
  {
    path: 'detail-user',
    component: DetailUserComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
