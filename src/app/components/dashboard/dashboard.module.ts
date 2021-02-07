import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule
  ],
  providers: [
    DashboardService,
    UsersService
  ]
})
export class DashboardModule { }
