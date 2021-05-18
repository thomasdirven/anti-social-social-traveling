import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
  } from '@angular/router';
  import { Trip } from './trip.model';
  import { Injectable } from '@angular/core';
  import { TripDataService } from './trip-data.service';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class TripResolver implements Resolve<Trip> {
    constructor(private tripService: TripDataService) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Trip> {
      return this.tripService.getTrip$(route.params['id']);
    }
  }