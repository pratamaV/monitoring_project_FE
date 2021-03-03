import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseComponent } from './release/release.component';
import { TaskComponent } from './task/task.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { FormUserComponent } from './user/form-user/form-user.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { ListReleaseComponent } from './release/list-release/list-release.component';
import { DetailProfileComponent } from './profile/detail-profile/detail-profile.component';
import { FormProfileComponent } from './profile/form-profile/form-profile.component';
import { DetailTaskComponent } from './task/detail-task/detail-task.component';
import { DetailReleaseComponent } from './release/detail-release/detail-release.component';



@NgModule({
  declarations: [ReleaseComponent, TaskComponent, ListUserComponent, FormUserComponent, ListTaskComponent, ListReleaseComponent, DetailProfileComponent, FormProfileComponent, DetailTaskComponent, DetailReleaseComponent],
  imports: [
    CommonModule
  ]
})
export class MasterModule { }
