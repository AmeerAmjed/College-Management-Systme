import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { ContentEditableFormDirective } from './content-editable-form.directive';

@NgModule({
  declarations: [
    TeacherComponent,
    ContentEditableFormDirective
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
