import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NavbarModule } from './navbar/navbar.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    NavbarModule,
    // RouterModule
  ],
  
})
export class IndexModule { }
