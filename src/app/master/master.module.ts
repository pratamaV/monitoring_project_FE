import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {SidebarModule} from '../layout/sidebar/sidebar.module';
import { FormReleaseComponent } from './release/form-release/form-release.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { FormTaskComponent } from './task/form-task/form-task.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';
import { FitHomeComponent } from './home/fit-home/fit-home.component';

@NgModule({
  declarations: [MasterComponent, FormReleaseComponent, FormTaskComponent, FitHomeComponent],
    imports: [
        CommonModule,
        MasterRoutingModule,
        SidebarModule,
        ReactiveFormsModule
    ],
  exports: [
  SidebarComponent
]

})
export class MasterModule { }
