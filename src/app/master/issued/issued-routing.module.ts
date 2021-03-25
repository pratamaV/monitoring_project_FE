import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListIssuedComponent} from './list-issued/list-issued.component';
import {FormIssuedComponent} from './form-issued/form-issued.component';

const routes: Routes = [
  {
    path: '',
    component: ListIssuedComponent
  },
  {
    path: 'form-issued',
    component: FormIssuedComponent
  },
  {
    path: 'form-issued/:id',
    component: FormIssuedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuedRoutingModule { }
