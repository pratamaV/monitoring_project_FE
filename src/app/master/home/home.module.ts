import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IssuedRoutingModule} from '../issued/issued-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import {HomeComponent} from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IssuedRoutingModule,
    ReactiveFormsModule,
    SidebarModule
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
