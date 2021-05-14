import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { ContentEditableFormDirective } from './content-editable-form.directive';
@NgModule({
  declarations: [HomeComponent ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[FormBuilder]
})
export class HomeModule { }
