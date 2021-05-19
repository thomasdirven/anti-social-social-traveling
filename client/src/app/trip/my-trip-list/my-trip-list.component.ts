import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { Traveler } from 'src/app/user/traveler.model';
import { UserDataService } from 'src/app/user/user-data.service';
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
  private _fetchTraveler$: Observable<Traveler[]>;
  // this is needlessly cashing, keeping state, always avoid keeping state if you can
  public errorMessage: string = '';

  public filterTripCity: string;
  public filterTripCity$ = new Subject<string>();

  public filterTripCountry: string;
  public filterTripCountry$ = new Subject<string>();

  public filterTripDateRange: Date[] = new Array();

  constructor(
    private _tripDataService: TripDataService,
    private _userDataService: UserDataService
  ) {
    this.filterTripCity$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCity = val));
    this.filterTripCountry$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCountry = val));
    this._fetchMyTrips$ = this._tripDataService.allTrips$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        // already logged in tripDataService
        // console.log(err);
        return EMPTY;
      })
    );
    this._fetchTraveler$ = this._userDataService.theLoggedInTraveler$.pipe(
      tap(console.log),
      catchError((err) => {
        this.errorMessage = err;
        console.log(err);
        return EMPTY;
      })
    );
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

  get loggedInTraveler$(): Observable<Traveler[]> {
    return this._fetchTraveler$;
  }

  ngOnInit(): void {
    // this._fetchMyTrips$ = this._tripDataService.myTrips$.pipe(
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     // already logged in tripDataService
    //     // console.log(err);
    //     return EMPTY;
    //   })
    // );
  }
}
