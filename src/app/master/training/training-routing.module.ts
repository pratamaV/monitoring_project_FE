import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from 'src/app/auth-guard.service';
import { ListTrainingComponent } from './list-training/list-training.component';
import { RegisterTrainingComponent } from './register-training/register-training.component';
import { ReviewTrainingComponent } from './review-training/review-training.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { ListTrainingNonComponent } from './list-training-non/list-training-non.component';
import { RegisterTrainingNonComponent } from './register-training-non/register-training-non.component';
import { ReviewTrainingAaComponent } from './review-training-aa/review-training-aa.component';
import { EditTrainingNonComponent } from './edit-training-non/edit-training-non.component';
import { ApproveTrainingAaComponent } from './approve-training-aa/approve-training-aa.component';

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
        path: 'non',
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
        component: ListTrainingNonComponent
      },
      {
        path: 'register',
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
        component: RegisterTrainingComponent
      },
      {
        path: 'register/non',
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
        component: RegisterTrainingNonComponent
      },
      {
        path: 'edit/:id',
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
        component: EditTrainingComponent
      },
      {
        path: 'edit/non/:id',
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
        component: EditTrainingNonComponent
      },
      {
        path: 'review',
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
        component: ReviewTrainingComponent
      },
      {
        path: 'review/aa',
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
        component: ReviewTrainingAaComponent
      },
      {
        path: 'approval/:id',
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
        component: ApproveTrainingAaComponent
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class TrainingRoutingModule { }
