import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetpasswordRoutingModule } from './setpassword-routing.module';
import { SetpasswordComponent } from './setpassword.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { AuthService } from '../../../../services/auth.service';


@NgModule({
  declarations: [SetpasswordComponent],
  imports: [
    CommonModule,
    SetpasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
//   exports: [SetpasswordComponent],
// providers:[AuthService]
})
export class SetpasswordModule { }
