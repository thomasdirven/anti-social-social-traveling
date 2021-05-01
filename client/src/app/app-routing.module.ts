import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripListComponent } from './trip/trip-list/trip-list.component';
import { AddTripComponent } from './trip/add-trip/add-trip.component';
import { TripDetailComponent } from './trip/trip-detail/trip-detail.component';

const appRoutes: Routes = [
  { path: 'trip/list', component: TripListComponent },
  { path: 'trip/add', component: AddTripComponent },
  { path: 'trip/detail/:id', component: TripDetailComponent },
  { path: '', redirectTo: 'trip/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
