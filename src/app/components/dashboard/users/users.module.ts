import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[FormBuilder, AppComponent,]
})
export class UsersModule { }
