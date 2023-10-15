import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from 'src/app/auth-guard.service';
import { ListTrainingComponent } from './list-training/list-training.component';
import { RegisterTrainingComponent } from './register-training/register-training.component';
import { ReviewTrainingComponent } from './review-training/review-training.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';

const routes: Routes = [
    {
        path: '',
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
        component: ListTrainingComponent
      },
      {
        path: 'register',
        canActivate: [AuthGuardService],
        data: {
          role: [
            '01',
            '02',
            '05'
          ]
        },
        component: RegisterTrainingComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuardService],
        data: {
          role: [
            '01',
            '02',
            '05'
          ]
        },
        component: EditTrainingComponent
      },
      {
        path: 'review',
        canActivate: [AuthGuardService],
        data: {
          role: [
            '01',
            '02',
            '05'
          ]
        },
        component: ReviewTrainingComponent
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class TrainingRoutingModule { }
