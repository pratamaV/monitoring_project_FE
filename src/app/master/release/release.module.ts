import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseRoutingModule } from './release-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListReleaseComponent } from './list-release/list-release.component';
import {SidebarModule} from "../../layout/sidebar/sidebar.module";
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ListReleaseComponent],
    imports: [
        CommonModule,
        ReleaseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPaginationModule
    ]
})
export class ReleaseModule { }
