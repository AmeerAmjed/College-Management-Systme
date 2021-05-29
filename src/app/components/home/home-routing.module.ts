import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const homeRoutes: Route[] = [
  {
    path: 'home',
    
    //  canActivate: [HomeGuard],
    component : HomeComponent,

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
