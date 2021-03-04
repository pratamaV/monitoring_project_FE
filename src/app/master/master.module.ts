import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {LayoutModule} from '../layout/layout.module';
import {SidebarComponent} from './sidebar/sidebar.component';



@NgModule({
  declarations: [MasterComponent, SidebarComponent],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    LayoutModule
  ]

})
export class MasterModule { }
