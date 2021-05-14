import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeGuard } from 'src/app/guards/home.guard';
import { HomeComponent } from './home.component';

const homeRoutes: Route[] = [
  {
    path : 'home',
    component : HomeComponent,
    // canActivate: [HomeGuard],

  },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./auth/login/login.module').then(m => m.LoginModule),
  // },
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
