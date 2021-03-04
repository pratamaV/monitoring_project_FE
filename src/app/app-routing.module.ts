import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './master/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: LoginComponent},
  {path: 'dashboard', loadChildren: () => import('./master/master.module').then((m) => m.MasterModule)},
  {path: 'logout', loadChildren: () => import('./auth/auth.module').then((a) => a.AuthModule)},
  {path: '**', component: NotFoundComponent}
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
