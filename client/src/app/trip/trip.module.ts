import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { AttractionComponent } from './attraction/attraction.component';
import { MaterialModule } from '../material/material.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { AddTripComponent } from './add-trip/add-trip.component';

@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent,
    TripListComponent,
    AddTripComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TripListComponent
  ]
})

export class TripModule { }
