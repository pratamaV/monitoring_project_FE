import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCurrencyRpPipe } from './pipes/custom-currency.pipe';



@NgModule({
  declarations: [CustomCurrencyRpPipe],
  imports: [
    CommonModule
  ],
  exports: [
    CustomCurrencyRpPipe
  ]
})
export class SharedModule { }
