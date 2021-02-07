import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoweredRoutingModule } from './powered-routing.module';
import { PoweredComponent } from './powered.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [PoweredComponent],
  imports: [
    CommonModule,
    PoweredRoutingModule,
    NavbarModule
  ], 
})
export class PoweredModule { }
