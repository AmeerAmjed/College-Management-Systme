import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { IndexGuard } from 'src/app/guards/index.guard';
import { SetpasswordGuard } from 'src/app/guards/setpassword.guard';


import { IndexComponent } from './index.component';

const indexRoutes: Route[] = [
  {
    path : '',
    component : IndexComponent,
    // canActivate: [IndexGuard],
  },
  {
    path: 'login',
    // canActivate: [IndexGuard],
    data: { title: 'Heroes List' },
    loadChildren: () =>
      import('./auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'setpassword',
    canActivate: [SetpasswordGuard],
    loadChildren: () =>
      import('./auth/setpassword/setpassword.module').then(m => m.SetpasswordModule),
  },
  {
    path: 'idea',
    loadChildren: () =>
      import('./idea/idea.module').then(m => m.IdeaModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./news/news.module').then(m => m.NewsModule),
  },
  {
    path: 'powered',
    loadChildren: () =>
      import('./powered/powered.module').then(m => m.PoweredModule),
  },
  {
    path: 'teach',
    loadChildren: () =>
      import('./teacher/teacher.module').then(m => m.TeacherModule),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./resources/resources.module').then(m => m.ResourcesModule),
  },
  {
    path: 'id',
    loadChildren: () =>
      import('./profile/profile.module').then(m => m.ProfileModule),
  },
    // { path: '**' ,   redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(indexRoutes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
