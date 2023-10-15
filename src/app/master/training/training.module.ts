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


@NgModule({
    declarations: [ListTrainingComponent, RegisterTrainingComponent, ReviewTrainingComponent, EditTrainingComponent],
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