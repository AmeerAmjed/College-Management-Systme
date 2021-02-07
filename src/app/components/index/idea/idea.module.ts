import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaComponent } from './idea.component';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [IdeaComponent],
  imports: [
    CommonModule,
    IdeaRoutingModule,
    NavbarModule,
  ],
  providers:[RouterModule]
})
export class IdeaModule { }
