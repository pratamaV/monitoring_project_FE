import{ NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent} from "./list-user/list-user.component";
import { FormUserComponent } from './form-user/form-user.component';
import { DetailUserComponent} from "./detail-user/detail-user.component";
import {UserRoutingModule} from "./user-routing.module";
import {LayoutModule} from "../../layout/layout.module";

@NgModule({
  declarations: [DetailUserComponent, FormUserComponent, ListUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule]
})
export class UserModule{}
