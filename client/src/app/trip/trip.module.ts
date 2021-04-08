import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { AttractionComponent } from './attraction/attraction.component';



@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TripComponent
  ]
})
export class TripModule { }
