import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardGuard } from 'src/app/guards/dashboard.guard';
import { DashboardComponent } from './dashboard.component';
import { InfoComponent } from './info/info.component';
import { UsersComponent } from './users/users.component';

export const Dashboardoutes: Route[] = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    data: {
      role: 'admin'
    },
    
    children: [
      {
        path: '',
        loadChildren: () => import('./../dashboard/info/info.module').then(m => m.InfoModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./../dashboard/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./../dashboard/new/new.module').then(m => m.NewModule),
      },

    ]

  }

]


@NgModule({
  imports: [RouterModule.forChild(Dashboardoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
