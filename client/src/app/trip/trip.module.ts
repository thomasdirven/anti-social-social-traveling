import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { AttractionComponent } from './attraction/attraction.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TripComponent
  ]
})
export class TripModule { }
