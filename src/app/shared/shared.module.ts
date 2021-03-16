import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [CustomDatePipe, SidebarComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    CustomDatePipe,
    SidebarComponent
  ]
})
export class SharedModule { }
