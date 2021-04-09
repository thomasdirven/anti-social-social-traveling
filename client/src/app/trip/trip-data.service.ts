import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TRIPS } from './mock-trips';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  // private _trips = TRIPS;

  constructor(private http: HttpClient) {}

  get trips$(): Observable<Trip[]> {
    // return this._trips;
    return this.http.get(`${environment.apiUrl}/trips/`)
    .pipe(
      map((list : any[]): Trip[] => list.map(Trip.fromJSON))
    );
  }

  // addNewTrip(trip: Trip){
  //   // this._trips.push(trip);
  //   // Necessary for DOM changes
  //   // Didn't notice the differnce
  //   this._trips = [...this._trips, trip]
  // }
}
