import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripComponent } from './trip/trip.component';
import { AttractionComponent } from './attraction/attraction.component';
import { MaterialModule } from '../material/material.module';
import { TripListComponent } from './trip-list/trip-list.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { AgmCoreModule } from '@agm/core';
import { GmapComponent } from './gmap/gmap.component';
import { GeocodeService } from './geocode.service';
import { GeocodeComponent } from './geocode/geocode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripFilterCountryPipe } from './trip-filter-country.pipe';
import { TripFilterCityPipe } from './trip-filter-city.pipe';
import { TripFilterDateRangePipe } from './trip-filter-date-range.pipe';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TripResolver } from './TripResolver';

// Google API key
// AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM
// used for Maps JavaScript API and Geocoding API

const tripRoutes: Routes = [
  { path: 'list', component: TripListComponent },
  { path: 'add', component: AddTripComponent },
  {
    path: 'detail/:id',
    component: TripDetailComponent,
    resolve: { trip: TripResolver },
  },
];

@NgModule({
  declarations: [
    TripComponent,
    AttractionComponent,
    TripListComponent,
    AddTripComponent,
    GmapComponent,
    GeocodeComponent,
    TripFilterCountryPipe,
    TripFilterCityPipe,
    TripFilterDateRangePipe,
    TripDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByzFs-RMMy83HcDPftNNp_JddxVD4rurM',
    }),
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(tripRoutes)
  ],
  providers: [GeocodeService],
  exports: [TripListComponent, AddTripComponent],
})
export class TripModule {}
