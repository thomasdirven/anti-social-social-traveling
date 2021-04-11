import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
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
      catchError(this.handleError),
      map((list : any[]): Trip[] => list.map(Trip.fromJSON))
    );
  }

  handleError(err:any): Observable<never>{
    let errorMessage: string;
    if(err instanceof HttpErrorResponse){
      errorMessage = `"${err.status} ${err.statusText}" when accessing "${err.url}"`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  // addNewTrip(trip: Trip){
  //   // this._trips.push(trip);
  //   // Necessary for DOM changes
  //   // Didn't notice the differnce
  //   this._trips = [...this._trips, trip]
  // }
}
