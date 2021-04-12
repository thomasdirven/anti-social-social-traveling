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

// Google API key
// AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM

@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent,
    TripListComponent,
    AddTripComponent,
    TripFilterPipe,
    GmapComponent,
    GeocodeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM'
    })
  ],
  providers: [GeocodeService],
  exports: [
    TripListComponent
  ]
})

export class TripModule { }
