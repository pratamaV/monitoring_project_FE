import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './master/home/home.component';
import { AuthGuardService } from './auth-guard.service';
import {FitHomeComponent} from './master/home/fit-home/fit-home.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuardService],
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'fit-home',
    canActivate: [AuthGuardService],
    component: FitHomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./master/master.module').then(m => m.MasterModule)
  },
  // {
  //   path: 'logout',
  //   loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
  // },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
