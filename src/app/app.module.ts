import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MasterModule} from './master/master.module';
import {AuthService} from './AuthService';
import {AuthGuardService} from './auth-guard.service';
import {SidebarModule} from './layout/sidebar/sidebar.module';
import {HomeComponent} from './master/home/home.component';
import { SharedModule } from './shared/shared.module';
import { LoadingComponent } from './layout/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoadingComponent
  ],
  imports: [
    MasterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SidebarModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
