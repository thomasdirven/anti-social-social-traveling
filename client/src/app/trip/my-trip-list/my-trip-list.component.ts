import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-my-trip-list',
  templateUrl: './my-trip-list.component.html',
  styleUrls: ['./my-trip-list.component.scss'],
})
export class MyTripListComponent implements OnInit {
  // variable to cache the results
  private _fetchMyTrips$: Observable<Trip[]>;
  // this is needlessly cashing, keeping state, always avoid keeping state if you can
  public errorMessage: string = '';

  public filterTripCity: string;
  public filterTripCity$ = new Subject<string>();

  public filterTripCountry: string;
  public filterTripCountry$ = new Subject<string>();

  public filterTripDateRange: Date[] = new Array();

  constructor(
    private _tripDataService: TripDataService
  )
  {
    this.filterTripCity$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCity = val));
    this.filterTripCountry$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCountry = val));
  }

  // duplicate input event trigger
  inputEventStartDate(event) {
    // Return date object
    console.log(event.value);
    this.filterTripDateRange[0] =
      event.value === null ? null : new Date(event.value);
  }
  inputEventEndDate(event) {
    // Return date object
    console.log(event.value);
    this.filterTripDateRange[1] =
      event.value === null ? null : new Date(event.value);
  }

  get myTrips$(): Observable<Trip[]> {
    return this._fetchMyTrips$;
  }

  ngOnInit(): void {
    this._fetchMyTrips$ = this._tripDataService.myTrips$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        // already logged in tripDataService
        // console.log(err);
        return EMPTY;
      })
    );
  }
}
