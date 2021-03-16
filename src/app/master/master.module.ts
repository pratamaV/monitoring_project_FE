import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]

})
export class MasterModule { }
