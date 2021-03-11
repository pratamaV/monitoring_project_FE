import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
<<<<<<< HEAD
import {SidebarModule} from '../layout/sidebar/sidebar.module';
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
        SidebarModule,
        ReactiveFormsModule
    ],
  exports: [
  SidebarComponent
]
=======
import {LayoutModule} from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    LayoutModule,
  ]
>>>>>>> origin/task

})
export class MasterModule { }
