import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent],

})
export class NavbarModule { }
