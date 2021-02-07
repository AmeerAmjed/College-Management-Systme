import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoweredComponent } from './powered.component';

const routes: Routes = [
  {
    path: '',
    component: PoweredComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoweredRoutingModule { }
