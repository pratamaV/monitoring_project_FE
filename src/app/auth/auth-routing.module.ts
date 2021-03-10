import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';


const routes: Routes = [
  {path: '', component: LogoutComponent},
  // {path: 'login', component: LoginComponent}
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AuthRoutingModule { }
