import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD

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
=======
import { CustomCurrencyRpPipe } from './pipes/custom-currency.pipe';



@NgModule({
  declarations: [CustomCurrencyRpPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomCurrencyRpPipe
>>>>>>> development-pull-wnt
  ]
})
export class SharedModule { }
