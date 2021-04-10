import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {

  constructor(private http: HttpClient) {}

  get trips$(): Observable<Trip[]> {
    // return this._trips;
    return this.http.get(`${environment.apiUrl}/trips/`)
    .pipe(
      // delay(2000), // to test mat-spinner loading
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
