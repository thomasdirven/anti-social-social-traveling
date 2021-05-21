import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { map, delay, catchError, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  // local copy of the trips (local caching)
  private _trips: Trip[];
  private _myTrips: Trip[];
  private _trips$ = new BehaviorSubject<Trip[]>([]);
  private _myTrips$ = new BehaviorSubject<Trip[]>([]);
  private _restoredTrip$ = new Subject<Trip>();

  constructor(private http: HttpClient) {
    this.trips$.subscribe((trips: Trip[]) => {
      this._trips = trips;
      this._trips$.next(this._trips);
    });
    this.myTrips$.subscribe((trips: Trip[]) => {
      this._myTrips = trips;
      this._myTrips$.next(this._myTrips);
    });
  }

  get allTrips$(): Observable<Trip[]> {
    return this._trips$;
    // to test errors we should call this one
    // this one throws an error, the above one doesn't
    // return this.trips$;
  }

  get allMyTrips$(): Observable<Trip[]> {
    return this._myTrips$;
  }

  get trips$(): Observable<Trip[]> {
    // return this._trips;
    return this.http.get(`${environment.apiUrl}/trips/`).pipe(
      delay(1200), // to test mat-spinner loading
      // tap(console.log), // for debugging in console
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Trip[] => list.map(Trip.fromJSON))
    );
  }

  get myTrips$(): Observable<Trip[]> {
    return this.http.get(`${environment.apiUrl}/trips/mytrips/`).pipe(
      delay(800), // to test mat-spinner loading
      // tap(console.log), // for debugging in console
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Trip[] => list.map(Trip.fromJSON))
    );
  }

  getTrip$(id: string): Observable<Trip> {
    return this.http
      .get(`${environment.apiUrl}/trips/${id}`)
      .pipe(catchError(this.handleError), map(Trip.fromJSON));
  }

  get restoredTrip$(): Observable<Trip> {
    return this._restoredTrip$.asObservable();
  }

  addNewTrip(trip: Trip) {
    //// this._trips.push(trip);
    //// Necessary for DOM changes
    //// Didn't notice the differnce
    //this._trips = [...this._trips, trip]
    //// og method
    // return this.http
    //   .post(`${environment.apiUrl}/trips/`, trip.toJSON())
    //   .pipe(tap(console.log), catchError(this.handleError), map(Trip.fromJSON))
    //   .subscribe((trip: Trip) => {
    //     this._trips = [...this._trips, trip];
    //     this._trips$.next(this._trips);
    //   });
    // temp new one so we can do errors as well
    return this.http
      .post(`${environment.apiUrl}/trips/`, trip.toJSON())
      .pipe(tap(console.log), catchError(this.handleError), map(Trip.fromJSON))
      .pipe(
        // temporary fix, while we use the behaviorsubject as a cache stream
        catchError((err) => {
          this._trips$.error(err);
          return throwError(err);
        }),
        tap((trip: Trip) => {
          this._trips = [...this._trips, trip];
          this._trips.sort((a,b)=>a.startDate.getTime()-b.startDate.getTime());
          this._trips$.next(this._trips);
          this._myTrips = [...this._myTrips, trip];
          this._myTrips.sort((a,b)=>a.startDate.getTime()-b.startDate.getTime());
          this._myTrips$.next(this._myTrips);
        })
      );
  }

  // does the same as addNewTrip +++ pushes new trip with new id given by DB
  // to the subject restoredTrip$ which emits it and replaces trip in trip-detail
  restoreTrip(trip: Trip) {
    return this.http
      .post(`${environment.apiUrl}/trips/`, trip.toJSON())
      .pipe(tap(console.log), catchError(this.handleError), map(Trip.fromJSON))
      .subscribe((trip: Trip) => {
        this._trips = [...this._trips, trip];
        this._trips.sort((a,b)=>a.startDate.getTime()-b.startDate.getTime());
        this._trips$.next(this._trips);
        this._myTrips = [...this._myTrips, trip];
        this._myTrips.sort((a,b)=>a.startDate.getTime()-b.startDate.getTime());
        this._myTrips$.next(this._myTrips);
        this._restoredTrip$.next(trip);
      });
  }

  deleteTrip(trip: Trip) {
    return this.http
      .delete(`${environment.apiUrl}/trips/${trip.id}`)
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        this._trips = this._trips.filter((tr) => tr.id != trip.id);
        this._trips$.next(this._trips);
        this._myTrips = this._myTrips.filter((tr) => tr.id != trip.id);
        this._myTrips$.next(this._myTrips);
      });
  }

  updateTrip(trip: Trip) {
    console.log(trip.participants);
    return this.http
      .put(`${environment.apiUrl}/trips/${trip.id}`, trip.toJSON())
      .pipe(tap(console.log), catchError(this.handleError))
      .subscribe(() => {
        // !!! don't do this, trips have been sorted
        // so the id differs from the location in the array
        // this._trips[trip.id] = trip;
        // instead you should do this
        // this._trips[this._trips.indexOf(trip)] = trip;
        // this._trips$.next(this._trips);
        // this used to work but not anymore since extra participant stuff
        console.log(trip.id);
        console.log(this._trips.findIndex(obj => obj.id == trip.id));
        this._trips[this._trips.findIndex(obj => obj.id == trip.id)] = trip;
        this._trips$.next(this._trips);
        this._myTrips[this._myTrips.findIndex(obj => obj.id == trip.id)] = trip;
        this._myTrips$.next(this._myTrips);
      });
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
}
