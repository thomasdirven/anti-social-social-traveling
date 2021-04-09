import { Injectable } from '@angular/core';
import { TRIPS } from './mock-trips';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private _trips = TRIPS;

  constructor() { }

  get trips(): Trip[] {
    return this._trips;
  }

  addNewTrip(trip: Trip){
    // this._trips.push(trip);
    // Necessary for DOM changes
    // Didn't notice the differnce
    this._trips = [...this._trips, trip]
  }
}
