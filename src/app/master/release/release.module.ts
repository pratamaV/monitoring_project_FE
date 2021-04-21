import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ReleaseRoutingModule } from './release-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListReleaseComponent } from './list-release/list-release.component';
import {SidebarModule} from "../../layout/sidebar/sidebar.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { ReleaseViewComponent } from './release-view/release-view.component';
import { DetailReleaseComponent } from './detail-release/detail-release.component';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [ListReleaseComponent, ReleaseViewComponent, DetailReleaseComponent],
    imports: [
        CommonModule,
        ReleaseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        NgxPaginationModule,
        Ng2OrderModule
    ],
    providers: [CurrencyPipe]
})
export class ReleaseModule { }
