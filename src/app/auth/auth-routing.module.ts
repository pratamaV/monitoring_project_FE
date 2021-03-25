import { NgModule } from '@angular/core';
<<<<<<< HEAD
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LogoutComponent} from './logout/logout.component';


const routes: Routes = [
  {path: '', component: LogoutComponent},
  // {path: 'login', component: LoginComponent}
  
=======
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
>>>>>>> development-pull-wnt
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
