import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampanasRoutingModule } from './campanas-routing.module';
import { CampanasComponent } from './campanas.component';


@NgModule({
  declarations: [
    CampanasComponent
  ],
  imports: [
    CommonModule,
    CampanasRoutingModule
  ]
})
export class CampanasModule { }
