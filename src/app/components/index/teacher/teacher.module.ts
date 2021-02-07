import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [TeacherComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NavbarModule
  ]
})
export class TeacherModule { }
