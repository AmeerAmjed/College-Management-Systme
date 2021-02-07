import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewModule { }
