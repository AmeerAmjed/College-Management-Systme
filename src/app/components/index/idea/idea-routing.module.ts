import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaComponent } from './idea.component';

const routes: Routes = [
  {
    path: '',
    component: IdeaComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeaRoutingModule { }
