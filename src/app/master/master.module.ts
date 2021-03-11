import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterRoutingModule} from './master-routing.module';
import {MasterComponent} from './master.component';
import {LayoutModule} from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    LayoutModule,
  ]

})
export class MasterModule { }
