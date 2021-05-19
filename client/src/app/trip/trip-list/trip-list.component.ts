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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDataService } from 'src/app/user/user-data.service';
import { Traveler } from 'src/app/user/traveler.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  // variable to cache the results
  private _fetchTrips$: Observable<Trip[]>;
  private _fetchTraveler$: Observable<Traveler[]>;
  // public loggedInTraveler: Traveler;
  // this is needlessly cashing, keeping state, always avoid keeping state if you can
  public errorMessage: string = '';

  public filterTripCity: string;
  public filterTripCity$ = new Subject<string>();

  public filterTripCountry: string;
  public filterTripCountry$ = new Subject<string>();

  public filterTripDateRange: Date[] = new Array();
  // public filterTripDateRange$ = new Subject<Date[]>();

  // public tripFilterDateRangeFG: FormGroup;

  // get startDate(): FormControl {
  //   return <FormControl>this.tripFilterDateRangeFG.get('startDate');
  // }
  // get endDate(): FormControl {
  //   return <FormControl>this.tripFilterDateRangeFG.get('endDate');
  // }

  // private _startDateStr: string;
  // private _endDateStr: string;

  constructor(
    private _tripDataService: TripDataService,
    private _userDataService: UserDataService // private fb: FormBuilder
  ) {
    this.filterTripCity$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCity = val));
    this.filterTripCountry$
      .pipe(distinctUntilChanged(), debounceTime(150))
      .subscribe((val) => (this.filterTripCountry = val));
    // this.filterTripDateRange$
    //   .pipe(distinctUntilChanged(), debounceTime(150))
    //   .subscribe((val) => (this.filterTripDateRange = val));
    this._fetchTrips$ = this._tripDataService.allTrips$.pipe(
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
    // this._userDataService.theLoggedInTraveler$
    // .pipe(
    //   tap(console.log),
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     console.log(err);
    //     return EMPTY;
    //   })
    // )
    // .subscribe(
    //   (loggedInTraveler) => (this.loggedInTraveler = loggedInTraveler)
    // );
  }

  // not in use, was replaced by filterTripCity$
  // applyFilter(filter: string) {
  //   this.filterTripCity = filter;
  // }

  get trips$(): Observable<Trip[]> {
    return this._fetchTrips$;
  }

  get loggedInTraveler$(): Observable<Traveler[]> {
    return this._fetchTraveler$;
  }

  // Add-Trip component will speak to tripDataService now
  // addNewTrip(trip: Trip) {
  //   this._tripDataService.addNewTrip(trip);
  // }

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

  ngOnInit(): void {
    // this._fetchTrips$ = this._tripDataService.allTrips$.pipe(
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     // already logged in tripDataService
    //     // console.log(err);
    //     return EMPTY;
    //   })
    // );
    // this._fetchTraveler$ = this._userDataService.theLoggedInTraveler$
    //   .pipe(
    //     tap(console.log),
    //     catchError((err) => {
    //       this.errorMessage = err;
    //       console.log(err);
    //       return EMPTY;
    //     })
    //   );
    // this._userDataService.theLoggedInTraveler$
    // .pipe(
    //   tap(console.log),
    //   catchError((err) => {
    //     this.errorMessage = err;
    //     console.log(err);
    //     return EMPTY;
    //   })
    // )
    // .subscribe(
    //   (loggedInTraveler) => (this.loggedInTraveler = loggedInTraveler)
    // );
    // this.tripFilterDateRangeFG = this.fb.group({
    //   startDate: [''],
    //   endDate: [''],
    // });
    // this.startDate.valueChanges.subscribe((hasValue) => {
    //   if (hasValue) {
    //     console.log(hasValue);
    //     this._startDateStr = hasValue;
    //   }
    // });
    // this.endDate.valueChanges.subscribe((hasValue) => {
    //   if (hasValue) {
    //     console.log(hasValue);
    //     this._endDateStr = hasValue;
    //   }
    // });
  }

  // Scroll on hover stuff
  public timer: ReturnType<typeof setTimeout>;

  scrollDiv(elementToScroll: HTMLElement, depl) {
    // console.log(elementToScroll);
    elementToScroll.scrollLeft -= depl;
    // console.log('scrolling...');
    this.timer = setTimeout(() => {
      this.scrollDiv(elementToScroll, depl);
    }, 30);
  }

  stopTimer(timer: number) {
    clearTimeout(timer);
  }
}
