import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
<<<<<<< HEAD
import {LayoutModule} from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    LayoutModule,
  ]
=======
import {SidebarModule} from '../layout/sidebar/sidebar.module';
import { FormReleaseComponent } from './release/form-release/form-release.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { FormTaskComponent } from './task/form-task/form-task.component';
import {SidebarComponent} from '../layout/sidebar/sidebar.component';
import { FitHomeComponent } from './home/fit-home/fit-home.component';

@NgModule({
  declarations: [MasterComponent, FormReleaseComponent, ListTaskComponent, FormTaskComponent, FitHomeComponent],
    imports: [
        CommonModule,
        MasterRoutingModule,
        SidebarModule,
        ReactiveFormsModule
    ],
  exports: [
  SidebarComponent
]
>>>>>>> development-pull-wnt

})
export class MasterModule { }
