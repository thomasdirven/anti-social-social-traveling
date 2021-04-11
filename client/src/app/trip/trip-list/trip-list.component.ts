import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';
import { Subject, Observable, of, EMPTY, merge } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  filter,
  catchError,
  scan,
  tap,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  // variable to cache the results
  private _fetchTrips$: Observable<Trip[]>;
  // this is needlessly cashing, keeping state, always avoid keeping state if you can
  public errorMessage: string = "";

  test = "clear";

  public filterTripCity: string;
  public filterTrip$ = new Subject<string>();
  constructor(private _tripDataService: TripDataService) {
    this.filterTrip$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCity = val));
  }
 
  applyFilter(filter: string) {
    this.filterTripCity = filter;
  }

  get trips$(): Observable<Trip[]> {
    return this._fetchTrips$;
  }

  addNewTrip(trip: Trip) {
    //this._tripDataService.addNewTrip(trip);
  }

  ngOnInit(): void {
    this._fetchTrips$ = this._tripDataService.trips$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );    
  }

}
