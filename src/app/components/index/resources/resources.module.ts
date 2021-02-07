import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    NavbarModule
  ]
})
export class ResourcesModule { }
