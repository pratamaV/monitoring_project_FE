import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {LayoutModule} from '../layout/layout.module';
import { FormReleaseComponent } from './release/form-release/form-release.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { FormTaskComponent } from './task/form-task/form-task.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@NgModule({
  declarations: [MasterComponent, FormReleaseComponent, ListTaskComponent, FormTaskComponent, SidebarComponent],
    imports: [
        CommonModule,
        MasterRoutingModule,
        LayoutModule,
        ReactiveFormsModule
    ],
  exports: [
  SidebarComponent
]

})
export class MasterModule { }
