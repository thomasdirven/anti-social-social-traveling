import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { AttractionComponent } from './attraction/attraction.component';
import { MaterialModule } from '../material/material.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripFilterPipe } from './trip-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './gmap/gmap.component';
import { GeocodeService } from './geocode.service';
import { GeocodeComponent } from './geocode/geocode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Google API key
// AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM
// used for Maps JavaScript API and Geocoding API

@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent,
    TripListComponent,
    AddTripComponent,
    TripFilterPipe,
    GmapComponent,
    GeocodeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM',
    }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GeocodeService],
  exports: [TripListComponent],
})
export class TripModule {}
