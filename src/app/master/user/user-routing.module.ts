import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent} from './form-user/form-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AuthGuardService } from 'src/app/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '05'
      ]
    },
    component: ListUserComponent
  },
  {
    path: 'form-user',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '04',
        '05'
      ]
    },
    component: FormUserComponent
  },
  {
    path: 'form-user/:id',
    canActivate: [AuthGuardService],
    data: {
      role: [
        '01',
        '02',
        '03',
        '04',
        '05'
      ]
    },
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
