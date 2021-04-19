import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ListProjectComponent } from './list-project/list-project.component';
import { FormProjectComponent } from './form-project/form-project.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import {ProjectRoutingModule} from './project-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListProjectUserComponent } from './list-project-user/list-project-user.component';
import { DetailProjectUserComponent } from './detail-project-user/detail-project-user.component';
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyProjectComponent } from './my-project/my-project.component';
import { Ng2OrderModule } from 'ng2-order-pipe';



@NgModule({
  declarations: [ListProjectComponent, FormProjectComponent, DetailProjectComponent, ListProjectUserComponent, DetailProjectUserComponent, MyProjectComponent],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        NgxPaginationModule,
        Ng2OrderModule
    ],
    providers: [CurrencyPipe]
})
export class ProjectModule { }
