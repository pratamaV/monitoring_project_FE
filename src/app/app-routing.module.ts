import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './master/home/home.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./master/master.module').then(m => m.MasterModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
