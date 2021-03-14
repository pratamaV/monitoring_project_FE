import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailTaskComponent } from './detail-task/detail-task.component';


const routes: Routes = [
  {
    path: 'detail',
    component: DetailTaskComponent
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
