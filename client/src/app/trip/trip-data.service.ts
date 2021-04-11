import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, delay, catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  // local copy of the trips (local caching)
  private _trips: Trip[];
  private _trips$ = new BehaviorSubject<Trip[]>([]);

  constructor(private http: HttpClient) {
    this.trips$.subscribe((trips: Trip[]) => {
      this._trips = trips;
      this._trips$.next(this._trips);
    });
  }

  get allTrips$(): Observable<Trip[]> {
    return this._trips$;
  }

  get trips$(): Observable<Trip[]> {
    // return this._trips;
    return this.http.get(`${environment.apiUrl}/trips/`).pipe(
      // delay(2000), // to test mat-spinner loading
      // tap(console.log), // for debugging in console
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Trip[] => list.map(Trip.fromJSON))
    );
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `"${err.status} ${err.statusText}" when accessing "${err.url}"`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  addNewTrip(trip: Trip) {
    //// this._trips.push(trip);
    //// Necessary for DOM changes
    //// Didn't notice the differnce
    //this._trips = [...this._trips, trip]    
    return this.http
      .post(`${environment.apiUrl}/trips/`, trip.toJSON())
      .pipe(tap(console.log), catchError(this.handleError), map(Trip.fromJSON))
      .subscribe((trip: Trip) => {
        this._trips = [...this._trips, trip];
        this._trips$.next(this._trips);
      });
  }

}
