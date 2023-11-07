import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {SidebarModule} from '../../layout/sidebar/sidebar.module';
import { SharedModule } from "src/app/shared/shared.module";
import { TrainingRoutingModule } from "./training-routing.module";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2OrderModule } from "ng2-order-pipe";
import { ListTrainingComponent } from "./list-training/list-training.component";
import { RegisterTrainingComponent } from "./register-training/register-training.component";
import { ReviewTrainingComponent } from "./review-training/review-training.component";
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { ListTrainingNonComponent } from "./list-training-non/list-training-non.component";
import { RegisterTrainingNonComponent } from "./register-training-non/register-training-non.component";
import { ReviewTrainingAaComponent } from "./review-training-aa/review-training-aa.component";
import { EditTrainingNonComponent } from "./edit-training-non/edit-training-non.component";
import { ApproveTrainingAaComponent } from "./approve-training-aa/approve-training-aa.component";


@NgModule({
    declarations: [
        ListTrainingComponent, 
        RegisterTrainingComponent, 
        ReviewTrainingComponent, 
        EditTrainingComponent, 
        ListTrainingNonComponent, 
        RegisterTrainingNonComponent, 
        EditTrainingNonComponent, 
        ReviewTrainingAaComponent, 
        ApproveTrainingAaComponent
    ],
      imports: [
          CommonModule,
          TrainingRoutingModule,
          FormsModule,
          ReactiveFormsModule,
          SidebarModule,
          SharedModule,
          NgxPaginationModule,
          Ng2OrderModule
      ],
      providers: [CurrencyPipe]
  })
  export class TrainingModule { }