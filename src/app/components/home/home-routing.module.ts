import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';


const homeRoutes: Route[] = [
  {
    path: 'home',
    //  canActivate: [HomeGuard],

    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'homeTech',
    loadChildren: () =>
      import('../home/teacher/teacher.module').then((m) => m.TeacherModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
