import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CustomDatePipe } from './pipes/custom-date.pipe';


@NgModule({
  declarations: [CustomDatePipe],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    CustomDatePipe
  ]
})
export class SharedModule { }
